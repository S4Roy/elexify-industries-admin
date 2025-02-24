import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { MediaManagementComponent } from './media-management.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',component: HomeLayoutComponent,
    children: [
      {
        path: '', component: MediaManagementComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MediaManagementRoutes {}
