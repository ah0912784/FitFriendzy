import { Component } from '@angular/core';

@Component({
  selector: 'ngx-home-groups',
  // styleUrls: ['./home_groups.component.scss'],
  template: `
      <nb-list>
        <nb-list-item *ngFor="let group of groups">
          {{ group }}
          <button nbButton class="right" status='info'>View Group</button>
        </nb-list-item>
      </nb-list>
  `,
})

export class HomeGroupComponent {
  // Dummy data until we can properly pull it
  groups = ["MSU Golf Friends", "Ragin' Tornados", "Wacky Warriors"]
}
