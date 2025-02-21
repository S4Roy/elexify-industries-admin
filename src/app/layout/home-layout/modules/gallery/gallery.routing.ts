import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
    path: '',component: HomeLayoutComponent,
    children: [
      {
        path: '', component: GalleryComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class GalleryRoutes {}
