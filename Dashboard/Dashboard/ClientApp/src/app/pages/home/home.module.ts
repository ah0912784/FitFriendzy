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
  NbInputModule
} from '@nebular/theme';
import { NbCalendarRangeModule } from '@nebular/theme';
import { NbAutocompleteModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { HomeActivityComponent } from './home_activity_feed/home_activity.component';
import { HomeNameComponent } from './home_name/home_name.component';
import { HomeProgressComponent } from './home_progress/home_progress.component';
import { HomeInputComponent } from './home_inputs/home_input.component';
import { GroupsModule } from '../groups/groups.module';

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
  ],
  declarations: [
    HomeComponent,
    HomeActivityComponent,
    HomeNameComponent,
    HomeProgressComponent,
    HomeInputComponent
  ],
})
export class HomeModule { }
