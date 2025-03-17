import { Routes, RouterModule } from '@angular/router';
import { AwardsComponent } from './awards.component';
import { NgModule } from '@angular/core';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
    path: '',component: HomeLayoutComponent,
    data: { pageTitle: 'Awards', breadcrumb: 'Awards' },
    children: [
      {
        path: '', component: AwardsComponent,
        data: { pageTitle: 'Awards', breadcrumb: '' },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AwardsRoutes {}