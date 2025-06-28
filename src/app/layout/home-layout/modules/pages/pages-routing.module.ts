import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { AboutComponent } from './about/about.component';
import { EnquiryComponent } from '../main/enquiry/enquiry.component';
import { WhyAiSatsComponent } from './why-ai-sats/why-ai-sats.component';
import { PageComponent } from './page/page.component';
import { pageResolver } from '../../../../core/resolver/page.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: '', breadcrumb: 'Pages' },
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full',
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
      {
        path: ':page_type',
        component: PageComponent,
        resolve: {
          pageData: pageResolver, // Use the resolver to fetch data based on page_type
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
