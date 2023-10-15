import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Activity } from '../../../interfaces/common/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesApi {
    private readonly apiController: string = 'activities';

    constructor(private http: HttpService) { }

    //get(activityId: any): Observable<any> {
    //  return this.http.get(`${this.apiController}/GetActivity/${activityId}`);
    //}

  getActivity(activityId: any): Observable<Activity> {
    return this.http.get(`${this.apiController}/getactivity/${activityId}`);
  }
}
