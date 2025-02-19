import { Component } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { MenuComponent } from '../menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-section4-landing-service-info-card',
  imports: [
    FormsModule, NgSelectModule,
    ReactiveFormsModule,
    NgxEditorModule, MatIconModule, NgIf],
  templateUrl: './home-section4-landing-service-info-card.component.html',
  styleUrl: './home-section4-landing-service-info-card.component.scss'
})
export class HomeSection4LandingServiceInfoCardComponent {

  formGroup!: FormGroup;
  servicesList: any = [];
  errmsg: any = [];

  constructor(private fb: FormBuilder,
    private master: MasterService,
    private toastr: ToastrService,
  ) {
    this.formGroup = this.fb.group({
      id: [null],
      services: [null]
    });
  }

  ngOnInit(): void {
    this.getPopularServiceList();
    this.getServicesList();
  }

  // onServicesChange(evt: any[]) {
  //   console.log(evt, "evttttttttttt");
  //   if (evt.length > 1) {
  //     evt.pop();
  //     this.formGroup.patchValue({ services: evt });
  //     this.errmsg = "please select up to 6";
  //     setTimeout(() => {
  //       this.errmsg = '';
  //     }, 10000); // 10000 milliseconds = 10 seconds
  //     this.getPopularServiceList();
  //   }
  //   this.errmsg = '';
  // }
   
  onServicesChange(evt: any[]) {
    console.log(evt, "evttttttttttt");
    
    if (evt.length > 6) {
      
      evt.pop();
      this.formGroup.patchValue({ services: evt }); 
      this.toastr.error("Please select up to 6 services.", '', {
        timeOut: 10000,
      });
      // this.errmsg = "Please select up to 6 services."; 
      // setTimeout(() => {
      //   this.errmsg = '';
      // }, 10000); 
  
      this.getPopularServiceList();
    } 
    // else {
      
    //   this.errmsg = '';
    // }
  }

  // compareItems(item1: any, item2: any): boolean {
  //   return item1 && item2 ? item1.id === item2.id : item1 === item2;
  // }

  getServicesList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getServicesList(params).pipe().subscribe(
      (res: any) => {
        //  console.log(res);
        this.servicesList = res?.results;
      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  getPopularServiceList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getPopularServiceList(params).pipe().subscribe(
      (res: any) => {
        // console.log(res);
        // this.serviceList = res?.service_list;
        let services = res?.results.map((item: any) => {
          return item.id
        })
        this.formGroup.patchValue({
          id: res?.setting_id,
          services: services
        })
      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  onSubmit() {
    // console.log(this.formGroup.getRawValue());
    if (this.formGroup.valid) {
      let formData = this.formGroup.getRawValue();
      if (!formData.id) {
        delete formData.id;
      }
      this.master.addPopularServices(formData).pipe().subscribe(
        (res: any) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.getPopularServiceList();
        },
        err => {
          this.toastr.error(err.error.msg, '', {
            timeOut: 1000
          });
        }
      )
    }
  }

}
