import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-unauthorized',
    styleUrls: ['./unauthorized.component.scss'],
    templateUrl: './unauthorized.component.html',
})
export class NgxUnauthorizedComponent {

    constructor(private router: Router) {}

    goToLogin() {
        this.router.navigateByUrl('auth/login');
    }
}
