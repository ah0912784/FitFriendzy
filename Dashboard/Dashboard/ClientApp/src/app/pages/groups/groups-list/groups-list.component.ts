import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GroupsApi } from '../../../@core/backend/common/api/groups.api';
import { UsersApi } from '../../../@core/backend/common/api/users.api';
import { User } from '../../../@core/interfaces/common/user';
import { Group } from '../../../@core/interfaces/common/group';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { GroupDataService } from '../../../@core/backend/common/services/group.service';

@Component({
  selector: 'ngx-groups-list',
  // styleUrls: ['./groups-list.component.scss'],
  templateUrl: './groups-list.component.html',
})


export class GroupsListComponent implements OnInit, OnDestroy {
  @Input() public: boolean = false;

  user: User;
  groups: Group[];

  receivedData: any;
  protected groupAddedSubscription: Subscription;
  protected readonly destroying$ = new Subject<void>();
  constructor(
    private apiService: GroupsApi,
    private userService: UsersApi,
    private dataService: GroupDataService,
    private router: Router) {
    this.groupAddedSubscription = this.dataService.groupAdded$.subscribe((event) => {
      if (event) {
        this.updateDataAfterGroupAdded();
      }
    });
  }

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;

      if (this.public) {
        console.log(user.userId);
        this.apiService.getAllOtherGroupsByUserId(user.userId).subscribe((groups) => {
          console.log(groups);
          this.groups = groups;
        });
      } else {
        this.apiService.getAllGroupsByUserId(user.userId).subscribe((groups) => {
          this.groups = groups;
        });
      }
    });
  }

  updateDataAfterGroupAdded() {
    this.updateData();
  }

  viewGroup(groupId: string) {
    this.router.navigate([`/pages/groups/${groupId}`]);
  }

  ngOnDestroy(): void {
    this.groupAddedSubscription.unsubscribe();
    this.destroying$.next();
    this.destroying$.complete();
  }
}
