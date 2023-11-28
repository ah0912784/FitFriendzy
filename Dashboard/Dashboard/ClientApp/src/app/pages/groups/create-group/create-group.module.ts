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

import { ThemeModule } from '../../../@theme/theme.module';
import { CreateGroupComponent } from './create-group.component';
import { GroupsApi } from '../../../@core/backend/common/api/groups.api';
import { UsersApi } from '../../../@core/backend/common/api/users.api';

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
    NbInputModule,
    NbFormFieldModule,
  ],
  declarations: [
    CreateGroupComponent,
  ],
  providers: [
    GroupsApi,
    UsersApi
  ]
})
export class CreateGroupModule { }
