import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { HomeModule } from './home/home.module';
import { ActivitiesModule } from './activities/activities.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    MiscellaneousModule,
    ThemeModule,
    HomeModule,
    ActivitiesModule,
    NbMenuModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
