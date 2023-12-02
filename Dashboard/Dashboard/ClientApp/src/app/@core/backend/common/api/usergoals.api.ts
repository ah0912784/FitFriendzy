import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { UserGoal } from '../../../interfaces/common/userGoal';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserGoalsApi {
  private readonly apiController: string = 'usergoals';

  constructor(private http: HttpService) { }

  getLatestGoal(userId: string): Observable<UserGoal> {
    return this.http.get(`${this.apiController}/get/latest/user/${userId}`);
  }

  createNewUserGoal(goal: UserGoal): Observable<any> {
    return this.http.post(`${this.apiController}/create/new`, goal, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
