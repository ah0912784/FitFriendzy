import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  NbComponentStatus, NbToastrService,
} from '@nebular/theme';
import { User } from '../../@core/interfaces/common/user';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersComponent implements OnInit, OnDestroy {
  constructor(private service: UsersApi,
    private toastrService: NbToastrService) {
  }

  protected readonly destroying$ = new Subject<void>();

  submitted = false;
  loading = true;
  newUser: User;
  users: User[];

  ngOnInit(): void {
    this.newUserModel();

    this.service.getCurrent().subscribe((user) => {

      this.service.getAll().subscribe((users) => {
        this.users = users.filter((x) => x.userId !== user.userId);
        this.loading = false;
      });
    });
  }

  switchUser(userId: string) {
    this.service.switchToUser(userId).subscribe((user) => {
      this.toastrService.success('Success', `Successfully switched to user ${user.userDisplayName}`);
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.newUser);

    const user: User = this.convertToUser(this.newUser);
    this.service.createNew(user)
      .pipe(takeUntil(this.destroying$))
      .subscribe((user) => {
        this.handleSuccessResponse('success');
      },
      err => {
        this.handleWrongResponse(err);
      });
  }

  convertToUser(value: any): User {
    const entity = this.toPersistedModel(value);

    return entity;
  }

  toPersistedModel(value: any): User {
    let retval: User = {
      userId: value.userId ? value.userId : null,
      firstName: value.firstName ? value.firstName : "",
      lastName:  value.lastName ? value.lastName : "",
      userDisplayName: value.userDisplayName ? value.userDisplayName : "",
      userName: value.userName ? value.userName : "",
      email: value.firstName ? value.firstName : "",
      phoneNumber: value.phoneNumber ? value.phoneNumber : "1234567890",
      password: value.password ? value.password : "Password123!"
    }

    return retval;
  }

  newUserModel() {
    this.newUser = {
      userId: null,
      userDisplayName: "",
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: ""
    }
  }

  handleSuccessResponse(status: NbComponentStatus) {
    this.newUserModel();
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

