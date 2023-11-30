import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Group } from '../../../interfaces/common/group';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../../interfaces/common/user';

@Injectable()
export class GroupsApi {
  private readonly apiController: string = 'groups';

  constructor(private http: HttpService) { }

  getAllByUserId(userId: string): Observable<Group[]> {
    return this.http.get(`${this.apiController}/get/all/${userId}`);
  }

  getAllUsersByGroupId(groupId: string): Observable<User[]> {
    console.log("api: ", groupId);
    return this.http.get(`${this.apiController}/get/all/users/${groupId}`);
  }

  getById(groupId: string): Observable<Group> {
    return this.http.get(`${this.apiController}/get/${groupId}`);
  }

  createNew(group: Group): Observable<Group> {
    return this.http.post(`${this.apiController}/create/new`, group, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
