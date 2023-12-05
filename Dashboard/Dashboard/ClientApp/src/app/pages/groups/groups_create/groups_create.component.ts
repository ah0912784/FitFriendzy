import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-groups-create',
  templateUrl: './groups_create.component.html',
})

// Needs:
// Method to test if name is taken
// Method to push new group to database

export class GroupsCreateComponent {
  groupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    if (this.validateSubmission(this.groupForm.value.groupName)) {
      if (this.groupForm.valid) {
        const groupName = this.groupForm.value.groupName;
        // Logs for debug/error checking
        console.log(`Group Name: ${groupName}`);
        // Should instead do a db push
      } else {
// tslint:disable-next-line:quotemark
        console.log("Please enter a valid group name.");
      }
    }
  }

  validateSubmission(name) {
    //if name length less than 5 or creater than 25, fail
    if (name.length < 5 || name.length > 25) {
      console.log("Length not between 5-25");
      return 0;
    }
    // ^ adjust as needed, I am unsure of current db schema

    //if name already taken in tb, fail
    // test here...

    //any other testing needed, fail negatives

    // else, pass
    return 1;
  }

}
