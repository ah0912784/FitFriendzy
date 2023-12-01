import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Group } from '../../../interfaces/common/group';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../../interfaces/common/user';
import { UserGroupMembership } from '../../../interfaces/common/userGroupMembership';

@Injectable()
export class GroupsApi {
  private readonly apiController: string = 'groups';

  constructor(private http: HttpService) { }

  getAllGroups(): Observable<Group[]> {
    return this.http.get(`${this.apiController}/get/all`);
  }

  getAllOtherGroupsByUserId(userId: string): Observable<Group[]> {
    return this.http.get(`${this.apiController}/get/all/other/${userId}`);
  }

  getAllGroupsByUserId(userId: string): Observable<Group[]> {
    return this.http.get(`${this.apiController}/get/all/${userId}`);
  }

  getAllUsersByGroupId(groupId: string): Observable<User[]> {
    return this.http.get(`${this.apiController}/get/all/users/${groupId}`);
  }

  getGroupById(groupId: string): Observable<Group> {
    return this.http.get(`${this.apiController}/get/${groupId}`);
  }

  createNewGroup(group: Group): Observable<any> {
    return this.http.post(`${this.apiController}/create/new`, group, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  joinNewGroup(membership: UserGroupMembership): Observable<any> {
    return this.http.post(`${this.apiController}/join/new`, membership, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
