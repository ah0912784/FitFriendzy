import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { HomeModule } from './home/home.module';
import { GroupsModule } from './groups/groups.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ActivitiesModule } from './activities/activities.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProfileModule } from './profile/profile.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    MiscellaneousModule,
    ThemeModule,
    HomeModule,
    GroupsModule,
    LeaderboardModule,
    ActivitiesModule,
    NbMenuModule,
    ProfileModule,
  ],
  declarations: [
    PagesComponent,
    // ProfileComponent,
  ],
})
export class PagesModule {
}
