import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupsApi } from '../../../@core/backend/common/api/groups.api';
import { UsersApi } from '../../../@core/backend/common/api/users.api';
import { User } from '../../../@core/interfaces/common/user';
import { Group } from '../../../@core/interfaces/common/group';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-groups-list',
  // styleUrls: ['./groups-list.component.scss'],
  templateUrl: './groups-list.component.html',
})


export class GroupsListComponent implements OnInit, OnDestroy {
  user: User
  groups: Group[];

  protected readonly destroying$ = new Subject<void>();
  constructor(
    private apiService: GroupsApi,
    private userService: UsersApi,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;

      this.apiService.getAllByUserId(this.user.userId).subscribe((groups) => {
        this.groups = groups;
      })

    })
  }

  viewGroup(groupId: string) {
    this.router.navigate([`/pages/groups/${groupId}`]);
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
