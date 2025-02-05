import { Routes } from '@angular/router';
import { guestGuard } from './core/gurds/guest.guard';
import { authGuard } from './core/gurds/auth.guard';
import { P404Component } from './error/p404/p404.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
//import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/home-layout/modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./layout/home-layout/modules/main/main.module').then(
        (m) => m.MainModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./layout/home-layout/modules/pages/pages.module').then(
        (m) => m.PagesModule
      ),
    canActivate: [authGuard],
  },
  // {
  //   path: 'others',
  //   component: HomeLayoutComponent,
  //   data: { Title: 'Home', breadcrumb: 'Others' },
  //   children: [
  //     {
  //       path: 'settings',
  //       loadChildren: () =>
  //         import('./layout/home-layout/modules/settings/settings.module').then(
  //           (m) => m.SettingsModule
  //         ),
  //       canActivate: [authGuard],
  //     },
  //   ],
  // },
  {
    path: 'settings',
    loadChildren: () =>
      import('./layout/home-layout/modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./layout/home-layout/modules/user/user.module').then(
        (m) => m.UserModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./layout/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      ),
    canActivate: [guestGuard],
  },
  {
    path: '**',
    component: P404Component,
    data: {
      pageTitle: 'Page Not Found',
    },
  },
];
