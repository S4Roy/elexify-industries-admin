import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialComponent } from './credential/credential.component';
import { HomeLayoutComponent } from '../../home-layout.component';
import { CredentialsListComponent } from './credential/credentials-list/credentials-list.component';
import { CategoryComponent } from './credential/category/category.component';
import { CertificateComponent } from './credential/certificate/certificate.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: 'Credentials', breadcrumb: 'Credentials' },
    children: [
      {
        path: '',
        component: CredentialComponent,
        data: { pageTitle: 'Credentials', breadcrumb: '' },
      },

      {
        path: 'list',
        component: CredentialsListComponent,
        data: { pageTitle: 'Credentials List', breadcrumb: 'List' },
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: { pageTitle: 'Credentials Category', breadcrumb: 'Category' },
      },
      {
        path: 'certificates',
        component: CertificateComponent,
        data: {
          pageTitle: 'Credentials Certificates',
          breadcrumb: 'Certificates',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredentialRoutingModule {}
