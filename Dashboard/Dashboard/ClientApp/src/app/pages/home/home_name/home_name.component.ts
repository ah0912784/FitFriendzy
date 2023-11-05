import { Component } from '@angular/core';

@Component({
  selector: 'ngx-home-name',
  // styleUrls: ['./home_activity.component.scss'],
  template: `
      {{firstName}} {{lastName}}
  `,
})

export class HomeNameComponent {
  // Dummy data until we can properly pull it
  firstName = "John"
  lastName = "Doe"
}
