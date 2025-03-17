import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnquiryManagementComponent } from './enquiry-management.component';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: 'Enquiry Management', breadcrumb: 'Enquiry Management' },
    children: [
      {
        path: '',
        component: EnquiryManagementComponent,
        data: { pageTitle: 'Enquiry Management', breadcrumb: '' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiryManagementRoutes {}
