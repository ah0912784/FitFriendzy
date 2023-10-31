import { Component } from '@angular/core';

@Component({
  selector: 'ngx-home-activity',
  // styleUrls: ['./home_activity.component.scss'],
  template: `
      <nb-list>
        <nb-list-item *ngFor="let group of groups">
          {{ group }}
        </nb-list-item>
      </nb-list>
  `,
})

export class HomeActivityComponent {
  // Dummy data until we can properly pull it
  groups = ["Running - 60 Minutes - 20 Points - 2 Days ago",
    "Running - 45 minutes - 15 Points - 3 Days ago",
    "Weightlifting - 60 minutes - 15 Points - 6 Days ago"]
}
