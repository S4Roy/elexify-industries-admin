import { Routes, RouterModule } from '@angular/router';
import { AwardsComponent } from './awards.component';
import { NgModule } from '@angular/core';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
    path: '',component: HomeLayoutComponent,
    children: [
      {
        path: '', component: AwardsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AwardsRoutes {}