import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbProgressBarModule,
  NbInputModule
} from '@nebular/theme';
import { ActivitiesApi } from '../../@core/backend/common/api/activities.api';
import { ThemeModule } from '../../@theme/theme.module';
import { ActivitiesComponent } from './activities.component';
import { HomeModule } from '../home/home.module';
import { ActivitiesInputComponent } from './activites_input/home_inputs/activites_input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    HomeModule,
    NbProgressBarModule,
    NbInputModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
  ],
  declarations: [
    ActivitiesComponent,
    ActivitiesInputComponent,
  ],
  providers: [
    // ActivitiesApi
  ],
})
export class ActivitiesModule { }
