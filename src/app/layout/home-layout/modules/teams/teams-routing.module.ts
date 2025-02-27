import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../../home-layout.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
   {
       path: '',
       component: HomeLayoutComponent,
       //data: { pageTitle: 'Users', breadcrumb: '' },
       children: [
         {
           path: '',
           component: TeamsComponent,
           data: { pageTitle: 'Teams', breadcrumb: 'Teams' },
         },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
