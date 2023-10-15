import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { ActivitiesApi } from '../../@core/backend/common/api/activities.api';
import { ThemeModule } from '../../@theme/theme.module';
import { ActivitiesComponent } from './activities.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule
  ],
  declarations: [
    ActivitiesComponent,
  ],
  providers: [
    // ActivitiesApi
  ],
})
export class ActivitiesModule { }
