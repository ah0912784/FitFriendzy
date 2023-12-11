import { NgModule } from '@angular/core';
import {
  NbProgressBarModule,
  NbCalendarModule,
  NbTabsetModule,
  NbUserModule,
  NbSelectModule,
  NbListModule,
  NbSpinnerModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import { NbCalendarRangeModule } from '@nebular/theme';
import { NbAutocompleteModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { HomeNameComponent } from './home_name/home_name.component';
import { HomeProgressComponent } from './home_progress/home_progress.component';
import { ActivitiesModule } from '../activities/activities.module';
import { GroupsModule } from '../groups/groups.module';
import { UserGoalsApi } from '../../@core/backend/common/api/usergoals.api';
import { ActivitiesApi } from '../../@core/backend/common/api/activities.api';
import { UsersApi } from '../../@core/backend/common/api/users.api';

@NgModule({
  imports: [
    ThemeModule,
    NbCalendarRangeModule,
    NbAutocompleteModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbSelectModule,
    NbListModule,
    NbSpinnerModule,
    NbIconModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbInputModule,
    GroupsModule,
    NbCalendarModule,
    ActivitiesModule
  ],
  declarations: [
    ActivityFeedComponent,
    HomeNameComponent,
    HomeProgressComponent,
    HomeComponent,
  ],
  providers: [
    UserGoalsApi,
    UsersApi,
    ActivitiesApi
  ]
})
export class HomeModule { }
