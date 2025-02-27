import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { AboutComponent } from './about/about.component';
import { EnquiryComponent } from '../main/enquiry/enquiry.component';
import { HomeComponent } from './home/home.component';
import { WhyAiSatsComponent } from './why-ai-sats/why-ai-sats.component';

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
        component: HomeComponent,
        data: { pageTitle: 'Home', breadcrumb: 'Home' },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { pageTitle: 'About', breadcrumb: 'About' },
      },
      {
        path: 'why-anctpl',
        component: WhyAiSatsComponent,
        data: { pageTitle: 'Why ANCTPL', breadcrumb: 'Why ANCTPL?' },
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
