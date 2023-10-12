import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  NgxAuthComponent,
    NgxLogoutComponent,
  NgxUnauthorizedComponent,
    NgxLoginComponent
} from './components';

import {
  NbAlertModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { AuthRoutingModule } from './auth-routing.module';

const COMPONENTS = [
  NgxAuthComponent,
    NgxLogoutComponent,
  NgxUnauthorizedComponent,
  NgxLoginComponent
];

const NB_MODULES = [
  NbIconModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule
];

// these urls will be skipped and not have JWT bearer token added to them
export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/auth/login', '/auth/sign-up', '/auth/request-pass', '/auth/refresh-token']
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ...NB_MODULES,
  ],
  providers: [
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: []
    };
  }
}
