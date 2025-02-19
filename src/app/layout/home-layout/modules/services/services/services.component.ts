import { Component } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { MatDialog } from '@angular/material/dialog';
import { AddNewServicesComponent } from '../add-new-services/add-new-services.component';
import { MasterServiceManagementService } from '../../../../../core/services/master-service-management.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../../../core/services/master.service';

@Component({
  selector: 'app-services',
  imports: [MenuComponent, NgFor, NgIf, RouterOutlet],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  service_list: any = [];
  constructor(private dialog: MatDialog,
    private masterServiceManagement: MasterServiceManagementService,
    private toastr: ToastrService,
    private master: MasterService,
    private sanitizer: DomSanitizer,

  ) {
   // this.data? this.formGroup.patchValue(this.data) : null

  }

  ngOnInit() {
    this.getServiceManagementListData();
  }

  addItem(data: any = null) {
    this.dialog
      .open(AddNewServicesComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        this.getServiceManagementListData();

      });
  }
  // getHeroSectionData(data?: any) {
  //   let params: URLSearchParams = new URLSearchParams();
  //   this.master.getHeroSectionData(params).pipe().subscribe(
  //     (res: any) => {
  //      // console.log(res, "heroSectionData ressssssssss");
  //       this.heroSectionData = res;
  //     },
  //     err => {
  //       this.toastr.error(err.error.msg, '', {
  //         timeOut: 1000,
  //       });
  //       // this.loading = LoadingState.Ready;
  //     }
  //   );
  // }

  getServiceManagementListData(data?: any) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('page_size', '0');

    this.masterServiceManagement.getServiceManagementList(params).pipe().subscribe(
      (res: any) => {
        console.log(res,"testttttt");
        // console.log(res, "heroSectionData ressssssssss");
        this.service_list = res.results;
      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  deleteItems(item:any) {
    console.log(item);
    const deletePayload = {
      id: item.id, 
     // setting_id: item.setting_id,
    };
    this.masterServiceManagement.deleteServiceManagementList(deletePayload).subscribe({
      next: (response) => {
       // console.log('Upload successful', response);
        this.toastr.success('Item Deleted Successfully!', '', {
          timeOut: 1000, // Display for 1 seconds
        });
        this.getServiceManagementListData();
       
      },
      error: (error) => {
        console.error('Upload failed', error);
       // this.formGroup.enable();
      },
      complete: () => {
       // this.formGroup.enable();
      }
    });
  }

  editItem(item:any){

        this.dialog
      .open(AddNewServicesComponent, {
        data: item,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {

      });

  }
    
    
  

}
