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
  NbLayoutModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { LeaderboardComponent } from './leaderboard.component';
import { CreateLeaderboardComponent } from './leaderboard/create-leaderboard/create-leaderboard.component';

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
    NbLayoutModule,
  ],
  declarations: [
    LeaderboardComponent,
    CreateLeaderboardComponent,
  ],
})
export class LeaderboardModule { }
