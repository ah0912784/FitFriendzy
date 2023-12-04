import { Component } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  // dummy data til db call
  popular = ["Running", "Weightlifting"]

  // db call for 2 most popular, put in popular array instead of line above

}
