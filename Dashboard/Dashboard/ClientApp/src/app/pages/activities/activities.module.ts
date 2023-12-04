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
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
    NbInputModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
  ],
  exports: [
    CreateActivityComponent
  ],
  declarations: [
    ActivitiesComponent,
    CreateActivityComponent,
  ],
  providers: [
    ActivitiesApi
  ],
})
export class ActivitiesModule { }
