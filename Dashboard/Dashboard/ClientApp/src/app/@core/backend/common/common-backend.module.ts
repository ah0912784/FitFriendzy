import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDataService } from './services/group.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';
import { NbAuthModule } from '@nebular/auth';
import { SettingsData } from '../../interfaces/common/settings';

// const API = [HttpService, UsersApi];

const SERVICES = [GroupDataService];

@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        // ...API,
        ...SERVICES,
      ],
    };
  }
}
