import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupDataService {
  private dataSubject = new BehaviorSubject<any>(null);
  private groupAddedSubject = new BehaviorSubject<boolean>(false);

  data$ = this.dataSubject.asObservable();
  groupAdded$ = this.groupAddedSubject.asObservable();

  updateData(data: any) {
    this.dataSubject.next(data);
  }

  notifyGroupAdded() {
    this.groupAddedSubject.next(true);
  }
}
