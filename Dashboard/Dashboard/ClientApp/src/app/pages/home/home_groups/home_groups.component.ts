import { Component } from '@angular/core';

@Component({
  selector: 'ngx-home-groups',
  template: `
      <nb-list>
        <nb-list-item *ngFor="let group of groups">
          {{ group }}
          <button nbButton class="right" status='info'>View Group</button>
        </nb-list-item>
      </nb-list>
  `,
  styles: [`
    button {
      margin-left: 10px;
      margin-right: 10px;
    }
  `]
})


export class HomeGroupComponent {
  // Dummy data until we can properly pull it
  groups = ["MSU Golf Friends", "Ragin' Tornados", "Wacky Warriors"]
}
