import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  NgxAuthComponent,
    NgxLogoutComponent,
  NgxUnauthorizedComponent,
    NgxLoginComponent
} from './components';

const routes: Routes = [{
    path: '',
    component: NgxAuthComponent,
    children: [
        {
        path: '',
        loadChildren: () => NgxLoginComponent,
        },
        {
            path: 'login',
            loadChildren: () => NgxLoginComponent,
        },
        {
            path: 'logout',
            component: NgxLogoutComponent,
        },
        {
            path: 'unauthorized',
            component: NgxUnauthorizedComponent,
        },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
