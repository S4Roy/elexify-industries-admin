import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityLogComponent } from './activity-log.component';
import { HomeLayoutComponent } from 'app/layout/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: 'Activity Log', breadcrumb: 'Activity Log' },
    children: [
      {
        path: '',
        component: ActivityLogComponent,
        data: { pageTitle: 'Activity Log', breadcrumb: '' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityLogRoutingModule {}
