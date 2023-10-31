import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../../../interfaces/common/user';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
    private readonly apiController: string = 'users';

    constructor(private http: HttpService) { }

    // api/users/getall
    getAll(): Observable<User[]> {
      return this.http.get(`${this.apiController}/getall`);
    }
}
