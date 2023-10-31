import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    UsersApi,
  ],
})
export class ProfileModule { }
