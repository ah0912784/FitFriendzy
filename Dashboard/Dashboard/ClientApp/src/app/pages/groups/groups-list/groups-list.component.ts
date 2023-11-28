import { Component } from '@angular/core';

@Component({
  selector: 'ngx-groups-list',
  // styleUrls: ['./groups-list.component.scss'],
  templateUrl: './groups-list.component.html',
})


export class GroupsListComponent {
  // Dummy data until proper db pull
  groups = ["MSU Golf Friends", "Ragin' Tornados", "Wacky Warriors"]

  // Needs -- pull users groups
  // set button to view each group? Not sure how we want to handle this tbh

}
