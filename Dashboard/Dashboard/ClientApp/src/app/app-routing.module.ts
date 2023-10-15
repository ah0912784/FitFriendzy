import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: 'pages',
    // canActivate: [MsalGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module')
      .then(m => m.AuthModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',
    useHash: false
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
