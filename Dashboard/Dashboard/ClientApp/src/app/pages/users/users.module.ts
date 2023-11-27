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
  NbTreeGridModule,
  NbInputModule,
  NbAccordionModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UsersApi } from '../../@core/backend/common/api/users.api';


import { ThemeModule } from '../../@theme/theme.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbFormFieldModule,
    NbActionsModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbSelectModule,
    NbListModule,
    NbSpinnerModule,
    NbIconModule,
    NbTreeGridModule,
    NbAccordionModule,
    NbInputModule,
    FormsModule
  ],
  declarations: [
    UsersComponent,
  ],
  providers: [
    UsersApi,
  ],
})
export class UsersModule { }
