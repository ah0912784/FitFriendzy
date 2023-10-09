import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ViewGroupsComponent } from './view-groups/view-groups.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      {
        path: 'create-group',
        component: CreateGroupComponent,
      },
      {
        path: 'view-groups',
        component: ViewGroupsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class GroupsRoutingModule {
}

