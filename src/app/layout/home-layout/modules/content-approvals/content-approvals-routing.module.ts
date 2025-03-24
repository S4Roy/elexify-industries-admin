import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentApprovalsComponent } from './content-approvals.component';
import { HomeLayoutComponent } from 'app/layout/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: 'Content Approvals', breadcrumb: 'Content Approvals' },
    children: [
      {
        path: '',
        component: ContentApprovalsComponent,
        data: { pageTitle: 'Content Approvals', breadcrumb: '' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentApprovalsRoutingModule {}
