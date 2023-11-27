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

import { ThemeModule } from '../../../@theme/theme.module';
import { GroupsViewComponent } from './groups_view.component';

@NgModule({
  imports: [
    ThemeModule,
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
  ],
  declarations: [
    GroupsViewComponent,
  ],
})
export class GroupsModule { }
