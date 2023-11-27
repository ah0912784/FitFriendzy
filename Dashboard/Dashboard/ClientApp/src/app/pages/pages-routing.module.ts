import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ActivitiesComponent } from './activities/activities.component';
import { GroupsComponent } from './groups/groups.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'groups',
      component: GroupsComponent,
    },
    {
      path: 'leaderboard',
      component: LeaderboardComponent,
    },
    {
      path: 'activities',
      component: ActivitiesComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
