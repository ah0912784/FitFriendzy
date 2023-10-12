import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApi } from './api/auth.api';
import { UserData } from '../../interfaces/common/user';
import { UsersService } from './services/users.service';
import { UserApi } from './api/user.api';
import { HttpService } from './api/http.service';
import { SettingsService } from './services/settings.service';
import { NbAuthModule } from '@nebular/auth';
import { SettingsData } from '../../interfaces/common/settings';
import { ClaimService } from './services/claim.service';

const API = [HttpService, UserApi, AuthApi];

const SERVICES = [UsersService, ClaimService];

const SERVICE_PROVIDERS = [
  { provide: UserData, useClass: UsersService },
  { provide: SettingsData, useClass: SettingsService },
];

@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
        ...SERVICE_PROVIDERS,
      ],
    };
  }
}
