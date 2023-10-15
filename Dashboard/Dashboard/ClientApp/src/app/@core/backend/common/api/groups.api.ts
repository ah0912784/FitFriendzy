import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class GroupsApi {
  private readonly apiController: string = 'groups';

  constructor(private http: HttpService) { }

  get(activityId: any): Observable<any> {
    return this.http.get(`${this.apiController}/get/${activityId}`);
  }
}
