import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerManagementComponent } from './career-management.component';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
    path: '',component: HomeLayoutComponent,
    children: [
      {
        path: '', component: CareerManagementComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CareerManagementRoutes {}
