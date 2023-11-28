import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../../../interfaces/common/user';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private readonly apiController: string = 'users';

  constructor(private http: HttpService) { }

  getCurrent(): Observable<User> {
    return this.getUser(environment.defaultUserId)
  }

  getUser(userId: string): Observable<User> {
    return this.http.get(`${this.apiController}/get/${userId}`)
  }

  // api/users/getall
  getAll(): Observable<User[]> {
    return this.http.get(`${this.apiController}/get/all`);
  }

  createNew(user: User): Observable<User> {
    return this.http.post(`${this.apiController}/create/new`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

}
