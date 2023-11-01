<<<<<<< HEAD
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { User } from '../../@core/interfaces/common/user';
import { Subject } from 'rxjs';
=======
import { Component, NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme/components/layout/layout.module';
import { ProfileBioComponent, ProfileGroupsComponent, ProfilePicComponent, ProfileStatsComponent } from '../../@theme/profile-components';
>>>>>>> 788e629 (Moved profile-components folder into themes. Added index.ts to properly export components. Added imports to pages\profile\profile.components.ts file.)

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
<<<<<<< HEAD
export class ProfileComponent implements OnInit, OnDestroy  {
  private alive = true;
  protected readonly unsubscribe$ = new Subject<void>();
  constructor(private service: UsersApi) { }
=======

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
>>>>>>> 788e629 (Moved profile-components folder into themes. Added index.ts to properly export components. Added imports to pages\profile\profile.components.ts file.)

  public users: User[];

  ngOnInit(): void {
    this.service.getAll().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.alive = false;
  }
}
