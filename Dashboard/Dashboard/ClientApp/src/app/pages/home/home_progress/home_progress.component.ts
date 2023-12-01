import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
    <nb-card>
    <form [formGroup]="goalForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="gpoints">Goal Points: </label>
          <input type="number" placeholder="Points To Earn" formControlName="gpoints" nbInput>
        </div>
      <button nbButton status="primary" type="submit">Set Goal</button>
    </form>
  </nb-card>  
  
    
  `,
  styles: [`
    * {
      padding-left: 10px;
      padding-right: 10px;
    }
  `]
})

export class HomeProgressComponent implements OnDestroy {
  protected readonly destroying$ = new Subject<void>();

  goalForm: FormGroup;
  goalPoints: number;

  range: NbCalendarRange<Date>;
  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, protected dateService: NbDateService<Date>) {
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

  onSubmit() {
    // retreive the start/end date and points
    const enteredPoints = this.goalForm.get('gpoints').value;
    // To convert the dates to timestamps https://stackoverflow.com/questions/29935730/how-to-convert-yyyy-mm-dd-hhmmss-to-unix-timestamp-in-angularjs-or-javascript
    const startDate = this.datePipe.transform(this.range.start, 'shortDate');
    var unixStartDate = (new Date(startDate.replace('-', '/'))).getTime() / 1000;
    const endDate = this.datePipe.transform(this.range.end, 'shortDate');
    var unixEndDate = (new Date(endDate.replace('-', '/'))).getTime() / 1000;
    // log the variables for testing
    console.log(`Goal Points: ${enteredPoints}, Unix Start Date: ${unixStartDate}, Unix End Date: ${unixEndDate}`);
    // TODO: use this information to push the new goal to the database instead of logging

  }

  // TODO:
  // Now, we need to PULL this data each time to update the goalbar component
  // db pull: select startDate, endDate, goalPoints from users where userID="howeverthisworks"
  // db pull: select sum(points) from whereverPointsAreAt where userID="howeverthisworks" AND date between (startDate and endDate)
  // from these pulls, set the variables points_this_period and goal
  // Dummy data until we can properly pull it

  // Okay we can pull the unix date, for example
  unixEndDate = '1701669600'
  // then it will need to be * 1000
  endDate = parseInt(this.unixEndDate) * 1000
  // this ex results in December 4, 2023

  points_this_period = 30;
  goal = 100;

  // Used to create the progress bar
  point_goal_ratio = ((this.points_this_period / this.goal) * 100);

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
