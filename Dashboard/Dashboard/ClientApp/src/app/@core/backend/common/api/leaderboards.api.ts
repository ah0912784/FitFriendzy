import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { LeaderboardEntry } from '../../../interfaces/common/leaderboardEntry';

@Injectable()
export class LeaderboardsApi {
  private readonly apiController: string = 'leaderboards';

  constructor(private http: HttpService) { }

  getEntriesByGroupId(groupId: string): Observable<LeaderboardEntry[]> {
    return this.http.get(`${this.apiController}/get/entries/${groupId}`);
  }
}
