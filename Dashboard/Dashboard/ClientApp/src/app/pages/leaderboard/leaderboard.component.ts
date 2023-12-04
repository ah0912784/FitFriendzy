import { Component, OnInit } from '@angular/core';
import { GroupsApi } from '../../@core/backend/common/api/groups.api';
import { Group } from '../../@core/interfaces/common/group';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { User } from '../../@core/interfaces/common/user';
import { UserGroupMembership } from '../../@core/interfaces/common/userGroupMembership';
@Component({
  selector: 'ngx-leaderboard',
  styleUrls: ['./leaderboard.component.scss'],
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  public user: User;
  public groups: Group[];
  public group_membership: UserGroupMembership;
  constructor(private userService: UsersApi, private GroupsService: GroupsApi) { }
  // method for rankings by group
  // 2) get other users within groups
  // 3) sort users within each group
  // 4) send individual leader board to createleaderboard via ngFor in html template

  // method for rankings from all users and all groups

  // Other methods
  ngOnInit(): void {
    // 1) get user groups
    const groupList = this.GroupsService.getAllGroupsByUserId(this.user.userId);
  

}
}
