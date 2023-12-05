import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivitiesApi } from '../../@core/backend/common/api/activities.api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-activities',
  templateUrl: './activities.component.html',
  styles: [`
    .form-group input {
      margin-left: 10px;
      margin-right: 10px;
    }
    * {
      padding: 10px;
    }
  `]
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  private alive = true;
  protected readonly unsubscribe$ = new Subject<void>();
  activityForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ActivitiesApi) {
    this.activityForm = this.fb.group({
      activityName: ['', Validators.required],
      pointsPerHour: [null, Validators.required]
    });
  }

  submitForm() {
    const activityName = this.activityForm.value.activityName
    const pointsPerHour = this.activityForm.value.pointsPerHour
    alert(`Suggestion Received! Activity: ${activityName}, Points per Hour: ${pointsPerHour}`)
    // If you want to add a suggestions DB connection, it can easily be added here where the vars are grabbed
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.alive = false;
  }
}
