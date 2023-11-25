import { Component } from '@angular/core';

@Component({
  selector: 'ngx-groups-view',
  // styleUrls: ['./home_activity.component.scss'],
  template: `
      <nb-list> 
        <nb-list-item *ngFor="let group of groups">
        <button nbButton style="float:right" status='info'>View Group</button> &nbsp;&nbsp;&nbsp; {{ group }}
        </nb-list-item>
      </nb-list>
  `,
})


export class GroupsViewComponent {
  // Dummy data until proper db pull
  groups = ["MSU Golf Friends", "Ragin' Tornados", "Wacky Warriors"]

  // Needs -- pull users groups
  // set button to view each group? Not sure how we want to handle this tbh

}
