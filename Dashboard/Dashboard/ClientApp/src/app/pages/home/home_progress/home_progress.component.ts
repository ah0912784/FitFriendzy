import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../../@core/interfaces/common/user';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { UserGoalsApi } from '../../../@core/backend/common/api/usergoals.api';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { UsersApi } from '../../../@core/backend/common/api/users.api';
import { UserGoal } from '../../../@core/interfaces/common/userGoal';

@Component({
  selector: 'ngx-home-progress',
  template: `
  <nb-card size="small">
      <nb-card-header>Goal Progress</nb-card-header>
      <nb-card-body>
        <p>
          Your progress for your goal ending {{endDate | date:'longDate'}} is {{points_this_period}} out of {{goal}} points!
        </p>
        <nb-progress-bar [value]=point_goal_ratio [displayValue]="true" status="success"></nb-progress-bar>
    </nb-card-body>
  </nb-card>
  
  <nb-card>
    <nb-card-header>
      Select New Goal
    </nb-card-header>
    <nb-card-header>
      Selected range: {{ range.start | date }} - {{ range.end | date }}
    </nb-card-header>
    <nb-card-body>
      <nb-calendar-range [(range)]="range" format="dd.MM.yyyy"></nb-calendar-range>
    </nb-card-body>
    <nb-card-body>
    <form [formGroup]="goalForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="gpoints">Goal Points: </label>
          <input type="number" placeholder="Points To Earn" formControlName="gpoints" nbInput>
          <button nbButton class="but" status="primary" type="submit">Set Goal</button>
        </div>
    </form>
    
  `,
  styles: [`
    * {
      padding-left: 10px;
      padding-right: 10px;
    }

    .but {
      margin-left: 10px;
    }
  `]
})

export class HomeProgressComponent implements OnInit, OnDestroy {
  protected readonly destroying$ = new Subject<void>();
  user: User;

  goalForm: FormGroup;
  userGoal: UserGoal;

  range: NbCalendarRange<Date>;
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private userService: UsersApi,
    protected dateService: NbDateService<Date>,
    private apiService: UserGoalsApi,
    
    ) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
    this.goalForm = this.formBuilder.group({
      gpoints: [null, Validators.required]
    })
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  unixEndDate = '1701669600'
  endDate = parseInt(this.unixEndDate) * 1000
  points_this_period = 30;
  goal = 100;

  // Used to create the progress bar
  point_goal_ratio = ((this.points_this_period / this.goal) * 100);

  ngOnInit(): void {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;

      if (!user) return;
      this.apiService.getLatestGoal(user.userId).subscribe((goal) => {
        if (!goal) return;

        this.userGoal = goal;
        
        this.updateGoalPerformance(goal);
      });

    })

  }

  updateGoalPerformance(goal: UserGoal) {
    this.goal = goal.targetPoints;
    this.points_this_period = goal.currentPoints;

    this.unixEndDate = goal.endTime.toString();
    this.endDate = parseInt(this.unixEndDate) * 1000

    this.point_goal_ratio = ((this.points_this_period / this.goal) * 100);
  }

  onSubmit() {
    // retreive the start/end date and points
    const targetPoints = this.goalForm.get('gpoints').value;

    // To convert the dates to timestamps https://stackoverflow.com/questions/29935730/how-to-convert-yyyy-mm-dd-hhmmss-to-unix-timestamp-in-angularjs-or-javascript
    const startDate = this.datePipe.transform(this.range.start, 'shortDate');
    var unixStartDate = (new Date(startDate.replace('-', '/'))).getTime() / 1000;

    const endDate = this.datePipe.transform(this.range.end, 'shortDate');
    var unixEndDate = (new Date(endDate.replace('-', '/'))).getTime() / 1000;
    const userId = this.user.userId;

    const newGoal: UserGoal = {
      userId: userId,
      startTime: unixStartDate,
      endTime: unixEndDate,
      targetPoints: targetPoints,
      currentPoints: 0
    }

    this.apiService.createNewUserGoal(newGoal)
      .pipe(takeUntil(this.destroying$))
      .subscribe((g) => {
        this.handleSuccessResponse('success');

        this.updateGoalPerformance(newGoal);
      },
        err => {
          this.handleWrongResponse(err);
        });
  }

  handleSuccessResponse(status: NbComponentStatus) {
    this.toastrService.success(status, `Successfully added new goal!`);
  }

  handleWrongResponse(err: any) {
    this.toastrService.danger(err, 'Something went wrong!');
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
