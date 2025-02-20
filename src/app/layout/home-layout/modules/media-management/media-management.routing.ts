import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { MediaManagementComponent } from './media-management.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'media-management', component: MediaManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MediaManagementRoutes {}
