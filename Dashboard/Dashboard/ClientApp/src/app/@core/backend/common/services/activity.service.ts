import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityDataService {
  private dataSubject = new BehaviorSubject<any>(null);
  private activityAddedSubject = new BehaviorSubject<boolean>(false);

  data$ = this.dataSubject.asObservable();
  activityAdded$ = this.activityAddedSubject.asObservable();

  updateData(data: any) {
    this.dataSubject.next(data);
  }

  notifyActivityAdded() {
    this.activityAddedSubject.next(true);
  }
}
