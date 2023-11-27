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
import { NbAutocompleteModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { HomeInputComponent } from './home_input.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbAutocompleteModule,
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
    HomeInputComponent,
  ],
})
export class HomeInputModule { }
