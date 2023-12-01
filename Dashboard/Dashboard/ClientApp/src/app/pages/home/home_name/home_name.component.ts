import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersApi } from '../../../@core/backend/common/api/users.api';

@Component({
  selector: 'ngx-home-name',
  // styleUrls: ['./home_activity.component.scss'],
  template: `
      {{firstName}} {{lastName}}
  `,
})

export class HomeNameComponent implements OnInit, OnDestroy {
  protected readonly destroying$ = new Subject<void>();
  firstName;
  lastName;

  constructor(private service: UsersApi) { }

  ngOnInit(): void {
    this.service.getCurrent().subscribe((user) => {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    })
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
