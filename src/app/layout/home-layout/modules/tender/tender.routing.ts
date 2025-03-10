import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenderComponent } from './tender.component';
import { HomeLayoutComponent } from '../../home-layout.component';
import { AddTenderComponent } from './add-tender/add-tender.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: '', breadcrumb: 'Tender Management ' },
    children: [
      {
        path: '',
        component: TenderComponent,
        data: { pageTitle: '', breadcrumb: '' },

      },
      {
        path: 'add',
        component: AddTenderComponent,
        data: { pageTitle: 'Add Tender', breadcrumb: 'Add New Tender' },
      },
      {
        path: 'edit/:id',
        component: AddTenderComponent,
        data: { pageTitle: 'Update Tender', breadcrumb: 'Update Tender' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenderRoutes {}
