import { Component, OnInit } from '@angular/core';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { User } from '../../@core/interfaces/common/user';

@Component({
  selector: 'ngx-groups',
  styleUrls: ['./groups.component.scss'],
  templateUrl: './groups.component.html',
})
export class GroupsComponent implements OnInit {

  user: User;
  constructor(private service: UsersApi) { }

  ngOnInit(): void {
    this.service.getCurrent().subscribe((user) => {
      this.user = user;
    })
  }
}
