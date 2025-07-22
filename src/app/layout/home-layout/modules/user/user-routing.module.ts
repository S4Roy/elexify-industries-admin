import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  //   {
  //      path: '',
  //      component: HomeLayoutComponent,
  //      data: { pageTitle: 'Users', breadcrumb: 'Users' }
  //   },
  //   {
  //     path: 'user',
  //     component: UserComponent,
  //     data: { pageTitle: 'Users', breadcrumb: 'Users' }
  //  },
  {
    path: '',
    component: HomeLayoutComponent,
    //data: { pageTitle: 'Users', breadcrumb: '' },
    children: [
      {
        path: '',
        component: UserComponent,
        data: { pageTitle: 'Customers', breadcrumb: 'Customers' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
