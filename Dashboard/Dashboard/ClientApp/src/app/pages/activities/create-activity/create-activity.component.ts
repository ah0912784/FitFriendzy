import { ChangeDetectionStrategy, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../../../@core/interfaces/common/activity';
import { UsersApi } from '../../../@core/backend/common/api/users.api';
import { User } from '../../../@core/interfaces/common/user';
import { ActivitiesApi } from '../../../@core/backend/common/api/activities.api';
import { NbToastrService } from '@nebular/theme';
import { ActivityDataService } from '../../../@core/backend/common/services/activity.service';


@Component({
  selector: 'ngx-create-activity',
  templateUrl: './create-activity.component.html',
  styles: [`
    .form-group input {
      margin-left: 10px;
      margin-right: 10px;
    }
    .create-activity {
      padding: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})


// KNOWN ISSUES:
// Currently, the points update one 'event' behind real time
// For example, if you enter 'running' and '3' for the duration, the result will be for 0
// Then, if you enter '5' for the duration, the result will be for a duration of '3'
// Could not find changes to update in real time, but now when you submit there will be a final update
// This means the ui may not be accurate until after you hit submit.

export class CreateActivityComponent implements OnInit, OnDestroy {
  protected readonly destroying$ = new Subject<void>();

  options: string[];
  points: { [key: string]: number };
  filteredOptions$: Observable<string[]>;

  inputForm: FormGroup;

  activity: Activity;
  user: User;

  @ViewChild('autoInput') input;

  constructor(private fb: FormBuilder,
    private userService: UsersApi,
    private apiService: ActivitiesApi,
    private toastrService: NbToastrService,
    private dataService: ActivityDataService
  ) { }

  ngOnInit() {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;
    })

    // Our current list of exercises. Looks ugly but it works :)
    this.options = ['Running', 'Jogging', 'Soccer', 'Basketball', 'Weightlifting', 'Football', 'Swimming', 'Walking', 'Golf'];
    this.points = {
      'Running': 10, 'Jogging': 8, 'Soccer': 8, 'Basketball': 8, 'Weightlifting': 7,
      'Football': 5, 'Golf': 3, 'Swimming': 3, 'Walking': 2
    };
    this.filteredOptions$ = of(this.options);

    this.inputForm = this.fb.group({
      activity: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(0)]],
      points: [{ value: 0 }] // , disabled: true
    });

    // Update to changes in the duration
    this.inputForm.get('duration').valueChanges.subscribe(() => {
      this.updatePoints();
    });
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  // Straight copied from the documentation, no idea
  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  // When a selection is made, grab the activity and duration, then update the points
  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
    this.inputForm.get('activity').setValue($event);
    this.updatePoints();
  }

  updatePoints() {
    const duration = this.inputForm.value.duration;
    const activity = this.inputForm.value.activity;

    // Check if both duration and activity are set
    if (duration !== null && activity !== null) {
      const activityPoints = this.points[activity];

      // Callculate points based on duration and activity point value
      // The value paired with an activity is its points per hour (ppr), so activity points needs to be /60
      // Round to make the numbers cleaner
      const calculatedPoints = (duration * (activityPoints / 60)).toFixed(2);

      // Update form points based on our calculations (previous line)
      this.inputForm.get('points').setValue(calculatedPoints);
    }
  }
  onSubmit() {
    if (this.inputForm.valid) {
      // Do a last update to ensure points are accurate
      this.updatePoints();
      this.activity = this.toPersistedModel(this.inputForm.value);

      this.apiService.addActivity(this.activity).subscribe(() => {
        this.handleSuccessResponse('success');
        this.dataService.notifyActivityAdded();
      },
      err => {
        this.handleWrongResponse(err);
      });

    } else {
      console.log("Please select an activity and provide a duration.");
    }
  }

  toPersistedModel(value: any): Activity {
    let retval: Activity = {
      userId: this.user.userId ? this.user.userId : '',
      activityType: value.activity ? value.activity : '',
      duration: value.duration ? value.duration : 0,
      pointsEarned: value.points ? value.points : 0
    }
    return retval;
  }

  handleSuccessResponse(status: any) {
    this.toastrService.success(status, `Successfully added new user!`);
  }

  handleWrongResponse(err: any) {
    this.toastrService.danger(err, 'Something went wrong!');
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
