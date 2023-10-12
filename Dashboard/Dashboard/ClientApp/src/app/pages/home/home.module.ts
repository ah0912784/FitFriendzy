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
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbSelectModule,
    NbListModule,
    LeafletModule,
    NbSpinnerModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbIconModule,
    NbButtonModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
