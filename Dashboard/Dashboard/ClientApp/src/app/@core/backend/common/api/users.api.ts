import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../../../interfaces/common/user';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private readonly apiController: string = 'users';
  private currentUserKey = environment.defaultUserId;

  constructor(private http: HttpService) { }

  getCurrent(): Observable<User> {
    const storedUser = localStorage.getItem(this.currentUserKey);
    console.log(storedUser);
    if (storedUser) {
      return of(JSON.parse(storedUser));
    } else {
      // if no user is stored, fetch the default user
      return this.getUser(environment.defaultUserId).pipe(
        tap((user) => {
          this.saveUserToStorage(user);
        })
      );
    }
  }

  // api/users/get/{userId}
  getUser(userId: string): Observable<User> {
    return this.http.get(`${this.apiController}/get/${userId}`)
  }

  // api/users/getall
  getAll(): Observable<User[]> {
    return this.http.get(`${this.apiController}/get/all`);
  }

  // api/users/switch/{userId}
  switchToUser(userId: string): Observable<User> {
    return this.getUser(userId).pipe(
      tap((user) => {
        this.saveUserToStorage(user);
      })
    );
  }

  // api/users/create/new
  createNew(user: User): Observable<User> {
    return this.http.post(`${this.apiController}/create/new`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  private saveUserToStorage(user: User): void {
    this.currentUserKey = user.userId;
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
}
