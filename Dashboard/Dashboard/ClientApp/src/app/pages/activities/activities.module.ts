import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
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
  ],
})
export class ActivitiesModule { }
