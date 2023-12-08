import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsApi } from '../../@core/backend/common/api/groups.api';
import { Group } from '../../@core/interfaces/common/group';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { User } from '../../@core/interfaces/common/user';
import { LeaderboardsApi } from '../../@core/backend/common/api/leaderboards.api';
import { LeaderboardEntry } from '../../@core/interfaces/common/leaderboardEntry';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'ngx-leaderboard',
  styleUrls: ['./leaderboard.component.scss'],
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  protected readonly destroying$ = new Subject<void>();
  public user: User;
  public groups: Group[];
  public leaderboardEntries: LeaderboardEntry[];
  constructor(private userService: UsersApi, private GroupsService: GroupsApi,
    private leaderboardService: LeaderboardsApi) { }
  ngOnInit(): void {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;
      this.getGroups(); // Move getGroups inside the subscribe callback
    });
  }

  getGroups() {
    try {
      this.GroupsService.getAllGroupsByUserId(this.user.userId).subscribe((groups: Group[]) => {
        this.groups = groups;
        console.log('getGroups ', this.groups);

        // Move the logic that depends on this.groups inside this callback
        this.groups.forEach((group) => {
          this.loadLeaderboardDetails(group.groupId);
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  loadLeaderboardDetails(groupId: string) {
    this.leaderboardService.getEntriesByGroupId(groupId).pipe(
      map(leaderboardEntries => leaderboardEntries.slice(0, 15)))
        .subscribe((leaderboardEntries) => {
          this.leaderboardEntries = leaderboardEntries;
        });
  }
  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
  }


