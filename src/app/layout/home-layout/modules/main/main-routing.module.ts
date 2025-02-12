import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { AnnouncementNoticeComponent } from './announcement-notice/announcement-notice.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: '', breadcrumb: '' },
    children: [
      {
        path: 'enquiry',
        component: EnquiryComponent
      },
      {
        path: 'announcement-notice',
        component: AnnouncementNoticeComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
