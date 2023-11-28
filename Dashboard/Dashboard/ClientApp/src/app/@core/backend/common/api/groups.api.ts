import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Group } from '../../../interfaces/common/group';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class GroupsApi {
  private readonly apiController: string = 'groups';

  constructor(private http: HttpService) { }

  get(activityId: any): Observable<any> {
    return this.http.get(`${this.apiController}/get/${activityId}`);
  }

  createNew(group: Group): Observable<Group> {
    return this.http.post(`${this.apiController}/create/new`, group, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
