import { Component, NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme/components/layout/layout.module';
import { ProfileBioComponent, ProfileGroupsComponent, ProfilePicComponent, ProfileStatsComponent } from '../../@theme/profile-components';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

  @NgModule({
    imports: [
      NbLayoutModule,
      ProfileBioComponent,
      ProfileGroupsComponent,
      ProfilePicComponent,
      ProfileStatsComponent,

    ],
  })
export class ProfileComponent {

}
