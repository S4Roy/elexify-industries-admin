import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
