import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerManagementComponent } from './career-management.component';
import { HomeLayoutComponent } from '../../home-layout.component';
import { AddCareerManagementComponent } from './add-career-management/add-career-management.component';
import { CareerDetailsComponent } from './career-details/career-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: 'Careers', breadcrumb: 'CAREERS' },
    children: [
      {
        path: '',
        component: CareerManagementComponent,
        data: { pageTitle: 'Careers', breadcrumb: '' },
      },
      {
        path: 'add',
        component: AddCareerManagementComponent,
        data: { pageTitle: 'Add New Opening', breadcrumb: 'ADD NEW OPENING' },
      },
      {
        path: 'edit/:id',
        component: AddCareerManagementComponent,
        data: { pageTitle: 'Update Opening', breadcrumb: 'UPDATE OPENING' },
      },
      {
        path: 'details/:id',
        component: CareerDetailsComponent,
        data: { pageTitle: 'Job Details', breadcrumb: 'Job Details' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerManagementRoutes {}
