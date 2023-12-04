import { NgModule } from '@angular/core';
import {
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbSelectModule,
  NbListModule,
  NbSpinnerModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { GroupsComponent } from './groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupComponent } from './group/group.component';
import { GroupsApi } from '../../@core/backend/common/api/groups.api';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { LeaderboardsApi } from '../../@core/backend/common/api/leaderboards.api';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbSelectModule,
    NbListModule,
    NbSpinnerModule,
    NbIconModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
  ],
  exports: [GroupsListComponent],
  declarations: [
    GroupsComponent,
    CreateGroupComponent,
    GroupsListComponent,
    GroupComponent
  ],
  providers: [
    GroupsApi,
    UsersApi,
    LeaderboardsApi
  ]
})
export class GroupsModule { }
