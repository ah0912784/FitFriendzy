import { NgModule } from '@angular/core';
import {
  NbUserModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,

} from '@nebular/theme';
import { ThemeModule } from 'C:/Users/rocke/source/repos/ah0912784/FitFriendzy/Dashboard/Dashboard/ClientApp/src/app/@theme/theme.module';
import { ProfileBioComponent } from './profile-bio.component';
@NgModule({
  imports: [
    NbUserModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
  ],
  declarations: [
    ProfileBioComponent,
  ],
})

export class ProfileBio { }
