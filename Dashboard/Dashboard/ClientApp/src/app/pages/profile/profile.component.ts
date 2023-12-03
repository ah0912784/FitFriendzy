import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersApi } from '../../@core/backend/common/api/users.api';
import { User } from '../../@core/interfaces/common/user';
import { Subject } from 'rxjs';



@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private alive = true;
  protected readonly unsubscribe$ = new Subject<void>();
  constructor(private service: UsersApi) { }

  public user: User;

  ngOnInit(): void {
    this.service.getCurrent().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.alive = false;
  }
  // Function to update the bio of the user
  updateBio(newBio: string): void {
    // Assuming UserDto has a property named 'id'
    const userId = this.user.userId;
    console.log(${ newBio });
    // db push here
    // this.service.updateUserBio(userId, newBio).subscribe(() => {
      // Handle any post-update logic
      // Reload the user or update the user's bio directly
    // });
  }
}
