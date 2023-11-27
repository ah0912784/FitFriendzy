import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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
import { ProfileBioComponent } from './profile-bio/profile-bio.component';

@NgModule({
  imports: [
    AsyncPipe,
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
    ProfileBioComponent,
  ],
  providers: [
    UsersApi,
  ],
})
export class ProfileModule { }
