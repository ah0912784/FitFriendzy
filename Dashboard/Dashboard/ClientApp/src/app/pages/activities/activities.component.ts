import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivitiesApi } from '../../@core/backend/common/api/activities.api';
import { Activity } from '../../@core/interfaces/common/activity';

@Component({
  selector: 'ngx-activities',
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  private alive = true;
  public activity: Activity;
  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private service: ActivitiesApi) { }

  ngOnInit(): void {
    this.service.getActivity(1234).subscribe((activity) => {
      this.activity = activity;
    });
  }

  getActivity(): void {
    this.service.getActivity(1290).subscribe((activity) => {
      this.activity = activity;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.alive = false;
  }
}
