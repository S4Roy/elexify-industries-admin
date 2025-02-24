import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesModule { }
