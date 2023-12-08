import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupsApi } from '../../../@core/backend/common/api/groups.api';
import { UsersApi } from '../../../@core/backend/common/api/users.api';
import { User } from '../../../@core/interfaces/common/user';
import { Group } from '../../../@core/interfaces/common/group';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { UserGroupMembership } from '../../../@core/interfaces/common/userGroupMembership';
import { NbToastrService } from '@nebular/theme';
import { LeaderboardsApi } from '../../../@core/backend/common/api/leaderboards.api';
import { LeaderboardEntry } from '../../../@core/interfaces/common/leaderboardEntry';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-group',
  styleUrls: ['./group.component.scss'],
  templateUrl: './group.component.html',
})


export class GroupComponent implements OnInit, OnDestroy {
  protected readonly destroying$ = new Subject<void>();
  groupId: string;
  group: Group;
  users: User[];
  currentUser: User;

  leaderboardEntries: LeaderboardEntry[];

  userInGroup = false;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: GroupsApi,
    private userService: UsersApi,
    private leaderboardService: LeaderboardsApi,
    private toastrService: NbToastrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupId');

      this.loadGroupDetails(this.groupId);
      this.loadLeaderboardDetails(this.groupId);
    });
  }

  loadGroupDetails(groupId: string) {
    this.apiService.getGroupById(groupId).subscribe((group: Group) => {

      this.group = group;

      this.apiService.getAllUsersByGroupId(groupId).subscribe((users) => {
        this.users = users;
        this.loading = false;

        this.userService.getCurrent().subscribe((user) => {
          this.currentUser = user;
          if (this.users.filter((x) => x.userId == user.userId).length == 0) {
            this.userInGroup = false;
          } else {
            this.userInGroup = true;
          }
        });
      })
    })
  }

  loadLeaderboardDetails(groupId: string) {
    // console.log("groupId", groupId);
    this.leaderboardService.getEntriesByGroupId(groupId).pipe(
      map(leaderboardEntries => leaderboardEntries.slice(0, 15))
    )
      .subscribe((leaderboardEntries) => {
        // console.log(leaderboardEntries);
      this.leaderboardEntries = leaderboardEntries;
    },
      err => {
        console.log(err);
      });
  }

  joinGroup() {
    let membership: UserGroupMembership = {
      userId: this.currentUser.userId,
      groupId: this.group.groupId,
      isAdmin: false,
    };

    this.apiService.joinNewGroup(membership).subscribe(() => {
      this.loadGroupDetails(this.group.groupId);
      this.toastrService.success('Success!', `You've successfully joined ${this.group.groupName}`);
    });
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
