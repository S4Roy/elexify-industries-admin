import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
         path: '',
         component: HomeLayoutComponent,
         children: [
           {
             path: '',
             component: BlogsComponent,
             data: { pageTitle: 'Success Stories', breadcrumb: 'Success Stories' },
           },
          ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
