import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { ServicesComponent } from './services/services.component';
import { UserComponent } from '../user/user/user.component';

const routes: Routes = [
  {
       path: '',
       component: HomeLayoutComponent,
       data: { pageTitle: 'Services', breadcrumb: 'Services' },
       children: [
         {
           path: '',
           component: ServicesComponent,
          data: { pageTitle: 'Services', breadcrumb: '' },
         },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
