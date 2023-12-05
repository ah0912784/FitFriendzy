import { Component, OnInit } from '@angular/core';
import { GroupsApi } from '../../@core/backend/common/api/groups.api';
import { Group } from '../../@core/interfaces/common/group';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { User } from '../../@core/interfaces/common/user';
import { LeaderboardsApi } from '../../@core/backend/common/api/leaderboards.api';
import { LeaderboardEntry } from '../../@core/interfaces/common/leaderboardEntry';
import { map } from 'rxjs/operators';
@Component({
  selector: 'ngx-leaderboard',
  styleUrls: ['./leaderboard.component.scss'],
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  public user: User;
  public groups: Group[];
  public leaderboardEntries: LeaderboardEntry[];
  constructor(private userService: UsersApi, private GroupsService: GroupsApi,
    private leaderboardService: LeaderboardsApi) { }
  ngOnInit(): void {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;
    });
    this.getLeaderboards();
  }
  getLeaderboards() {
    try {
    this.GroupsService.getAllGroupsByUserId(this.user.userId).subscribe((groups) => {
      this.groups = groups;
      // tslint:disable-next-line:whitespace
      // tslint:disable-next-line:prefer-const
        this.groups.forEach(group => {
          this.leaderboardService.getEntriesByGroupId(group.groupId);
        });
      });
// tslint:disable-next-line:whitespace
  } catch(e) {
      console.log(e.message);
      console.log(this.user);
      console.log(this.leaderboardEntries);

  }
  }

  loadLeaderboardDetails(groupId: string) {
    this.leaderboardService.getEntriesByGroupId(groupId).pipe(
      map(leaderboardEntries => leaderboardEntries.slice(0, 15)))
        .subscribe((leaderboardEntries) => {
          this.leaderboardEntries = leaderboardEntries;
        });
  }
  }


