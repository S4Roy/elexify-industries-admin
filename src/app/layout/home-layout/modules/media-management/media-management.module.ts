import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaManagementRoutes } from './media-management.routing';


@NgModule({
  imports: [
    CommonModule,
    MediaManagementRoutes
  ],
  declarations: [],
})

export class MediaManagementModule { }