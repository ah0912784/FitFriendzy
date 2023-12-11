import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Activity } from '../../../@core/interfaces/common/activity';
import { ActivitiesApi } from '../../../@core/backend/common/api/activities.api';
import { UsersApi } from '../../../@core/backend/common/api/users.api';
import { User } from '../../../@core/interfaces/common/user';
import { ActivityDataService } from '../../../@core/backend/common/services/activity.service';


@Component({
  selector: 'ngx-activity-feed',
  templateUrl: './activity-feed.component.html',
})

export class ActivityFeedComponent implements OnInit, OnDestroy {
  receivedData: any;
  protected activityAddedSubscription: Subscription;
  protected readonly destroying$ = new Subject<void>();

  user: User;
  activities: Activity[];

  constructor(
    private service: ActivitiesApi,
    private userService: UsersApi,
    private dataService: ActivityDataService
  ) {
    this.activityAddedSubscription = this.dataService.activityAdded$.subscribe((event) => {
      if (event) {
        this.updateFeed();
      }
    });
  }

  ngOnInit(): void {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;

      this.updateFeed();
    });
  }

  updateFeed() {
    this.service.getAll(this.user.userId).subscribe((activities) => {
      this.activities = activities;
    })
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }

}
