import { Component, Input, OnInit } from '@angular/core';
import { LeaderboardEntry } from '../../../../@core/interfaces/common/leaderboardEntry';
import { LeaderboardsApi } from '../../../../@core/backend/common/api/leaderboards.api';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'ngx-create-leaderboard',
  templateUrl: './create-leaderboard.component.html',
  styleUrls: ['./create-leaderboard.component.scss'],
})
export class CreateLeaderboardComponent {
  @Input() public gId: string;
  @Input() public leaderboardEntries: LeaderboardEntry[];
  constructor(private leaderboardService: LeaderboardsApi) { }

  ngOnInit(): void {
    this.loadLeaderboardDetails(this.gId);
  }
  loadLeaderboardDetails(groupId: string) {
    this.leaderboardService.getEntriesByGroupId(groupId).pipe(
      map(leaderboardEntries => leaderboardEntries.slice(0, 15)))
      .subscribe((leaderboardEntries) => {
        this.leaderboardEntries = leaderboardEntries;
      });
  }
}

