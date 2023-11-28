import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApi } from '../api/users.api';
import { User } from '../../../interfaces/common/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private api: UsersApi) {
  }

  // get gridDataSource(): DataSource {
  //  return this.api.usersDataSource;
  // }

  // list(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
  //  return this.api.list(pageNumber, pageSize);
  // }

  getCurrentUser(): Observable<User> {
    return this.api.getCurrent()
      .pipe(
        map(u => {
          // if (u && !u.setting) {
          //   u.setting = {};
          // }
        return u;
      }));
  }

  // get(id: number): Observable<User> {
  //  return this.api.get(id);
  // }

  // create(user: any): Observable<User> {
  //  return this.api.add(user);
  // }

  // update(user: any): Observable<User> {
  //  return this.api.update(user);
  // }

  // updateCurrent(user: any): Observable<User> {
  //  return this.api.updateCurrent(user);
  // }

  // delete(id: number): Observable<boolean> {
  //  return this.api.delete(id);
  // }
}
