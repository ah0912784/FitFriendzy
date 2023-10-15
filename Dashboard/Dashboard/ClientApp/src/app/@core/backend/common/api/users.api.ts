import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class UsersApi {
    private readonly apiController: string = 'users';

    constructor(private http: HttpService) { }

    get(activityId: any): Observable<any> {
      return this.http.get(`${this.apiController}/get/${activityId}`);
    }
}
