import { Routes, RouterModule } from '@angular/router';
import { ClienteleComponent } from './clientele.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'clientele', component: ClienteleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ClienteleRoutes {}