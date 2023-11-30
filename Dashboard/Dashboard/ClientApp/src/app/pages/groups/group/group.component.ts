import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupsApi } from '../../../@core/backend/common/api/groups.api';
import { UsersApi } from '../../../@core/backend/common/api/users.api';
import { User } from '../../../@core/interfaces/common/user';
import { Group } from '../../../@core/interfaces/common/group';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-group',
  // styleUrls: ['./groups-list.component.scss'],
  templateUrl: './group.component.html',
})


export class GroupComponent implements OnInit, OnDestroy {
  protected readonly destroying$ = new Subject<void>();
  groupId: string;
  group: Group;
  users: User[];

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: GroupsApi
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupId');
      // Call function or fetch data based on this.groupId
      this.loadGroupDetails(this.groupId);
    });
  }

  loadGroupDetails(groupId: string) {
    this.apiService.getById(groupId).subscribe((group: Group) => {

      this.group = group;

      this.apiService.getAllUsersByGroupId(groupId).subscribe((users) => {
        this.users = users;
        this.loading = false;
      })
    })
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
