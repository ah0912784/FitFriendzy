import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User, UserDto } from '../../../interfaces/common/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
    private readonly apiController: string = 'users';

    constructor(private http: HttpService) { }

    // api/users/getall
    getAll(): Observable<UserDto[]> {
      return this.http.get(`${this.apiController}/getall`);
    }

  createNew(user: UserDto): Observable<UserDto> {
    return this.http.post(`${this.apiController}/createnewuser`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


}
