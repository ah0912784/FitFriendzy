import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-home-name',
  // styleUrls: ['./home_activity.component.scss'],
  template: `
      {{firstName}} {{lastName}}
  `,
})

export class HomeNameComponent implements OnDestroy {
  protected readonly destroying$ = new Subject<void>();
  // Dummy data until we can properly pull it
  firstName = 'John';
  lastName = 'Doe';

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
