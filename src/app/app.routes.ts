import { Routes } from '@angular/router';
import { guestGuard } from './core/gurds/guest.guard';
import { authGuard } from './core/gurds/auth.guard';
import { P404Component } from './error/p404/p404.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { ForgetPasswordComponent } from './layout/auth-layout/forget-password/forget-password.component';
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
    path: 'services',
    loadChildren: () =>
      import('./layout/home-layout/modules/services/services.module').then(
        (m) => m.ServicesModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'media',
    loadChildren: () =>
      import('./layout/home-layout/modules/gallery/gallery.module').then(
        (m) => m.GalleryModule
      ),
  },
  {
    path: 'enquiry',
    loadChildren: () =>
      import('./layout/home-layout/modules/enquiry-management/enquiry-management.module').then(
        (m) => m.EnquiryManagementModule
      ),
  },
  {
    path: 'career',
    loadChildren: () =>
      import('./layout/home-layout/modules/career-management/career-management.module').then(
        (m) => m.CareerManagementModule
      ),
  },
  {
    path: 'clientele',
    loadChildren: () =>
      import('./layout/home-layout/modules/clientele/clientele.module').then(
        (m) => m.ClienteleModule
      ),
  },
  {
    path: 'awards',
    loadChildren: () =>
      import('./layout/home-layout/modules/awards/awards.module').then(
        (m) => m.AwardsModule
      ),
  },
  {
    path: 'newsevent',
    loadChildren: () =>
      import('./layout/home-layout/modules/news-event/news-event.module').then(
        (m) => m.NewsEventModule
      ),
  },
  {
    path: 'tender',
    loadChildren: () =>
      import('./layout/home-layout/modules/tender/tender.module').then(
        (m) => m.TenderModule
      ),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./layout/home-layout/modules/gallery/gallery.module').then(
        (m) => m.GalleryModule
      ),
  },
  {
    path: '**',
    component: P404Component,
    data: {
      pageTitle: 'Page Not Found',
    },
  },
];
