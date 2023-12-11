import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  protected readonly destroying$ = new Subject<void>();


  // dummy data til db call
  popular = ["Running", "Weightlifting"]

  // db call for 2 most popular, put in popular array instead of line above

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }

}
