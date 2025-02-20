import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerManagementComponent } from './career-management.component';

const routes: Routes = [
  { path: 'career-management', component: CareerManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CareerManagementRoutes {}
