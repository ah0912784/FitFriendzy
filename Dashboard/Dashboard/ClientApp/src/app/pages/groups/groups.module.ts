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
import { GroupsApi } from '../../@core/backend/common/api/groups.api';
import { UsersApi } from '../../@core/backend/common/api/users.api';

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
  declarations: [
    GroupsComponent,
    CreateGroupComponent,
    GroupsListComponent,
  ],
  providers: [
    GroupsApi,
    UsersApi
  ]
})
export class GroupsModule { }
