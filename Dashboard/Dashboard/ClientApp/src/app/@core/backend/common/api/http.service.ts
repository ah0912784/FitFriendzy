import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  get apiUrl(): string {
        return 'https://' + environment.domain + '/api';
  }

  constructor(private http: HttpClient) {}

  get(endpoint: string, options?): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, options).pipe(
      catchError(this.handleError) // Handle HTTP errors
    );
  }

  post(endpoint: string, data, options?): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, options).pipe(
      catchError(this.handleError) // Handle HTTP errors
    );
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, options).pipe(
      catchError(this.handleError) // Handle HTTP errors
    );
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options).pipe(
      catchError(this.handleError) // Handle HTTP errors
    );
  }

  // Implement a custom error handling function
  private handleError(error: any) {
    console.error('API request error:', error);

    // You can customize error handling logic here
    return throwError('An error occurred while fetching the activity.');
  }
}
