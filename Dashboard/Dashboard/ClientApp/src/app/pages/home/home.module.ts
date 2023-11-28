import { NgModule } from '@angular/core';
import {
  NbProgressBarModule,
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
import { NbAutocompleteModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { HomeGroupComponent } from './home_groups/home_groups.component';
import { HomeActivityComponent } from './home_activity_feed/home_activity.component';
import { HomeNameComponent } from './home_name/home_name.component';
import { HomeProgressComponent } from './home_progress/home_progress.component';
import { HomeInputComponent } from './home_inputs/home_input.component';

@NgModule({
  imports: [
    ThemeModule,
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
    NbInputModule
  ],
  declarations: [
    HomeComponent,
    HomeGroupComponent,
    HomeActivityComponent,
    HomeNameComponent,
    HomeProgressComponent,
    HomeInputComponent,
  ],
})
export class HomeModule { }
