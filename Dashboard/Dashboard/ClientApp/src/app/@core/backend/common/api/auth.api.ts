import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class AuthApi {
    constructor(private http: HttpService) { }

    authorize(idToken: string): Observable<any> {
        return this.http.post('auth/ex', null, {
            headers: { Authorization: 'Bearer ' + idToken }
        });
    }
}
