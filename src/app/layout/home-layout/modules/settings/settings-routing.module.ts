import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { HomeLayoutComponent } from '../../home-layout.component';
import { FaqsComponent } from './faqs/faqs.component';
import { SettingsLayoutComponent } from './settings-layout.component';
import { FaqsCategoryComponent } from './faqs/faqs-category/faqs-category.component';
import { FaqQuestionsComponent } from './faqs/faq-questions/faq-questions.component';
import { UserRolePermissionsComponent } from './user-role-permissions/user-role-permissions.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: 'Settings', breadcrumb: 'Settings' },
    children: [
      {
        path: '',
        component: SettingsComponent,
        data: { pageTitle: 'Settings', breadcrumb: '' },
      },
      {
        path: 'faq',
        component: SettingsLayoutComponent,
        data: { pageTitle: 'FAQ', breadcrumb: 'Faq' },
        children: [
          {
            path: '',
            component: FaqsComponent,
            data: { pageTitle: 'FAQ', breadcrumb: '' },
          },
          {
            path: 'category',
            component: FaqsCategoryComponent,
            data: { pageTitle: 'FAQ', breadcrumb: 'Faq Category' },
          },
          {
            path: 'questions',
            component: FaqQuestionsComponent,
            data: { pageTitle: 'FAQ', breadcrumb: 'Faq Questions' },
          },
        ],
      },
      {
        path: 'user-role-permissions',
        component: SettingsLayoutComponent,
        data: { pageTitle: 'role-permissions', breadcrumb: 'User Role & Permissions' },
        children: [
          {
            path: '',
            component: UserRolePermissionsComponent,
            data: { pageTitle: 'role-permissions', breadcrumb: '' },
          },
        ]
      },
      {
        path: 'terms-conditions',
        component: SettingsLayoutComponent,
        data: { pageTitle: 'terms-conditions', breadcrumb: 'Terms & Conditions' },
        children: [
          {
            path: '',
            component: TermsConditionsComponent,
            data: { pageTitle: 'terms-conditions', breadcrumb: '' },
          },
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
