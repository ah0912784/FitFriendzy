import { Component, NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme/components/card/card.module';

@Component({
  selector: 'ngx-profile-bio',
  templateUrl: './profile-bio.component.html',
  styleUrls: ['./profile-bio.component.scss'],
})
  @NgModule({
    imports: [
      // ...
      NbCardModule,
    ],
  })
export class ProfileBioComponent {}
