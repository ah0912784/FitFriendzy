import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-home-progress',
  // styleUrls: ['./home_activity.component.scss'],
  template: `
    <nb-card-body>
        <p>
          Your progress for {{month}} is {{points_this_period}} out of {{goal}} points!
        </p>

        <nb-progress-bar [value]="50" status="success"></nb-progress-bar>
    </nb-card-body>
  `,
  styles: [`
    * {
      padding-left: 10px;
      padding-right: 10px;
    }
  `]
})

export class HomeProgressComponent implements OnDestroy {
  protected readonly destroying$ = new Subject<void>();


  // Dummy data until we can properly pull it
  month = "October";
  points_this_period = 50;
  goal = 100;
  // Cant seem to pass this for value in nb-progress-bar
  point_goal_ratio = ((this.points_this_period / this.goal) * 100).toString;

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
