import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { User } from '../../@core/interfaces/common/user';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy  {
  private alive = true;
  protected readonly unsubscribe$ = new Subject<void>();
  constructor(private service: UsersApi) { }

  public user: User;

  ngOnInit(): void {
    this.service.getCurrent().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.alive = false;
  }
}
