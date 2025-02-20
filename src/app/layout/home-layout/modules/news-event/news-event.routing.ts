import { Routes, RouterModule } from '@angular/router';
import { NewsEventComponent } from './news-event.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'news-event', component: NewsEventComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class NewsEventsManagementRoutes {}
