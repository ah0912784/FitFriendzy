import { Component, NgModule } from '@angular/core';
import { NbUserModule } from '@nebular/theme/components/user/user.module';

@Component({
  selector: 'ngx-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],


})
@NgModule({
  imports: [
    // ...
    NbUserModule,
  ],
})
export class ProfilePicComponent {

}
