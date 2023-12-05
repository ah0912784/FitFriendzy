import { Component, Input } from '@angular/core';
import { LeaderboardEntry } from '../../../../@core/interfaces/common/leaderboardEntry';
@Component({
  selector: 'ngx-create-leaderboard',
  templateUrl: './create-leaderboard.component.html',
  styleUrls: ['./create-leaderboard.component.scss'],
})
export class CreateLeaderboardComponent {
  @Input() name: string;
  @Input() leaderboard: LeaderboardEntry[];

}
