import { Component } from '@angular/core';

@Component({
  selector: 'ngx-home_progress',
  // styleUrls: ['./home_activity.component.scss'],
  template: `
    <nb-card-body>
      Your progress for {{month}} is {{points_this_period}} out of {{goal}} points!
      <p></p>
        <nb-progress-bar [value]="50" status="success"></nb-progress-bar>
    </nb-card-body>
  `,
})

export class HomeProgressComponent {
  // Dummy data until we can properly pull it
  month = "October"
  points_this_period = 50
  goal = 100
  // Cant seem to pass this for value in nb-progress-bar
  point_goal_ratio = ((this.points_this_period / this.goal) * 100).toString
}
