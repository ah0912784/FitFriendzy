import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeUntil, filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

  get url(): string {
    return 'https://' + environment.domain;
  }

  private readonly destroy$: Subject<void> = new Subject<void>();

  loginDisplay = false;

  constructor(
    protected router: Router,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService
  ) { }

  ngOnInit(): void {
    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })

    this.logout();
  }

  logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: this.url + '/auth/login'
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
