import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: '', breadcrumb: 'Pages' },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AboutComponent,
        data: { pageTitle: 'Home', breadcrumb: 'Home' },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { pageTitle: 'About', breadcrumb: 'About' },
      },
      {
        path: 'our-services',
        component: AboutComponent,
        data: { breadcrumb: 'Our Service', pageTitle: 'Our Service' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
