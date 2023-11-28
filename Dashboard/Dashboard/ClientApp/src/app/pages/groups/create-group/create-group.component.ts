import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../@core/interfaces/common/user';
import { Group } from '../../../@core/interfaces/common/group';
import { GroupsApi } from '../../../@core/backend/common/api/groups.api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { UsersApi } from '../../../@core/backend/common/api/users.api';


@Component({
  selector: 'ngx-create-group',
  templateUrl: './create-group.component.html',
})

// Needs:
// Method to test if name is taken
// Method to push new group to database

export class CreateGroupComponent implements OnInit, OnDestroy {
  protected readonly destroying$ = new Subject<void>();
  groupForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private apiService: GroupsApi,
    private userService: UsersApi) {
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    this.userService.getCurrent().subscribe((user) => {
      this.user = user;
      console.log(this.user);
    })
  }

  onSubmit() {
    if (this.groupForm.valid) {
      const groupName = this.groupForm.value.groupName;
      // Logs for debug/error checking
      console.log(`Group Name: ${groupName}`);

      const group: Group = this.convertToGroup(this.groupForm.value);
      console.log("Group: ", group);
      this.apiService.createNew(group)
        .pipe(takeUntil(this.destroying$))
        .subscribe((g) => {
          this.handleSuccessResponse('success');
        },
          err => {
            this.handleWrongResponse(err);
          });
    } else {
      console.log("Please enter a valid group name.");
    }
  }

  convertToGroup(value: FormGroup): Group {
    const entity = this.getPersistedModel(value);

    return entity;
  }

  getPersistedModel(value: any): Group {
    console.log("User:", this.user);
    let retval: Group = {
      groupId: value.groupId ? value.groupId : null,
      groupLeaderId: value.groupLeaderId ? value.groupLeaderId : this.user.userId,
      groupName: value.groupName ? value.groupName : "",
    }

    return retval;
  }

  handleSuccessResponse(status: NbComponentStatus) {
    this.groupForm.reset();
    this.toastrService.success(status, `Successfully added new group!`);
  }

  handleWrongResponse(err: any) {
    this.toastrService.danger(err, 'Something went wrong!');
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
