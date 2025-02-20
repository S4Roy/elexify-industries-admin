import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnquiryManagementComponent } from './enquiry-management.component';

const routes: Routes = [
  { path: 'enquiry-management', component: EnquiryManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EnquiryManagementRoutes {}
