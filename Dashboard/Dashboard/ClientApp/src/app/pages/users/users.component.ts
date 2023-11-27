import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  NbComponentStatus,
  NbSortDirection, NbSortRequest,
  NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { User, UserDto } from '../../@core/interfaces/common/user';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'ngx-users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersComponent implements OnInit, OnDestroy {
  constructor(private service: UsersApi,
    private toastrService: NbToastrService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  protected readonly destroying$ = new Subject<void>();

  submitted = false;

  newUser: UserDto;

  ngOnInit(): void {
    this.newUserModel();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.newUser);

    const user: UserDto = this.convertToUser(this.newUser);
    this.service.createNew(user)
      .pipe(takeUntil(this.destroying$))
      .subscribe((u) => {
        this.handleSuccessResponse('success');
      },
      err => {
        this.handleWrongResponse(err);
      });
  }

  convertToUser(value: any): UserDto {
    const entity = this.getPersistedModel(value);

    return entity;
  }

  getPersistedModel(value: any): UserDto {
    let retval: UserDto = {
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

  customColumn = 'userId';
  defaultColumns = ['userDisplayName', 'userName', 'password', 'firstName', 'lastName', 'email', 'phoneNumber'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<UserDto>[] = [
    {
      data: {
        userId: "000-00000-00001",
        userDisplayName: "Leanne Graham",
        userName: "JohnDoe22",
        password: "testing124",
        firstName: "John",
        lastName: "Doe",
        email: "test@gmail.com",
        phoneNumber: "1234567890"
      }
    },
    {
      data: {
        userId: "000-00000-00002",
        userDisplayName: "Leanne Graham",
        userName: "JohnDoe22",
        password: "LEAnneG11",
        firstName: "John",
        lastName: "Doe",
        email: "test@gmail.com",
        phoneNumber: "1234567890"
      },
    },
    {
      data: {
        userId: "000-00000-00003",
        userDisplayName: "Leanne Graham",
        userName: "JohnDoe22",
        password: "OpsINeedHelp",
        firstName: "John",
        lastName: "Doe",
        email: "test@gmail.com",
        phoneNumber: "1234567890"
      }
    }
  ];
}

