import { Routes, RouterModule } from '@angular/router';
import { NewsEventComponent } from './news-event.component';
import { NgModule } from '@angular/core';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
    path: '',component: HomeLayoutComponent,
    data: { pageTitle: 'News & Events', breadcrumb: 'News & Events' },
    children: [
      {
        path: '', component: NewsEventComponent,
        data: { pageTitle: 'News & Events', breadcrumb: '' },

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class NewsEventsManagementRoutes {}
