import { NgModule } from '@angular/core';
import {
  NbUserModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbLayoutModule,
  NbActionsModule,
  NbIconModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    NbUserModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbLayoutModule,
    ThemeModule,
    NbActionsModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    UsersApi,
  ],
})
export class ProfileModule { }
