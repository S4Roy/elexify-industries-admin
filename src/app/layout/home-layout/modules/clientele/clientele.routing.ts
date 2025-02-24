import { Routes, RouterModule } from '@angular/router';
import { ClienteleComponent } from './clientele.component';
import { NgModule } from '@angular/core';
import { HomeLayoutComponent } from '../../home-layout.component';

const routes: Routes = [
  {
    path: '',component: HomeLayoutComponent,
    children: [
      {
        path: '', component: ClienteleComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ClienteleRoutes {}