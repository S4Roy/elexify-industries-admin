import { Routes, RouterModule } from '@angular/router';
import { AwardsComponent } from './awards.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'awards', component: AwardsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AwardsRoutes {}