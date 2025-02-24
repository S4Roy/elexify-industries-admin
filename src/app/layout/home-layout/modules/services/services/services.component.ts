import { Component, ViewChild } from '@angular/core';
//import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { MatDialog } from '@angular/material/dialog';
import { AddNewServicesComponent } from '../add-new-services/add-new-services.component';
import { MasterServiceManagementService } from '../../../../../core/services/master-service-management.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../../../core/services/master.service';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { MatMenuModule } from '@angular/material/menu';
 

@Component({
  selector: 'app-services',
  imports: [NgFor, NgIf, RouterOutlet, NgxDatatableModule, MatMenuModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  providers: [MasterServiceManagementService],
})
export class ServicesComponent {

  //@ViewChild(DatatableComponent) table: DatatableComponent<any> | any;

  rows: any[] = [];
  columns:any[] = [
    { name: 'Name', prop: 'name' },
    { name: 'Description', prop: 'description' },
    { name: 'Caption Text', prop: 'caption_text' },
    { name: 'Status', prop: 'status' },
    { name: 'Action', prop: 'action' },
  ];
  ColumnMode = ColumnMode;
  temp: any[] = [];

  constructor(private dialog: MatDialog,
              private masterServiceManagement: MasterServiceManagementService,
              private toastr: ToastrService,
              private master: MasterService,
              private sanitizer: DomSanitizer) 
              {
                // this.data? this.formGroup.patchValue(this.data) : null
                this.rows = [];
              }

  ngOnInit() {
    this.getServiceManagementList();
  }

  addItem(data: any = null) {
    this.dialog.open(AddNewServicesComponent, {
      data: data,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getServiceManagementList();
    });
  }

  getServiceManagementList(data?: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page_size', '0');
    this.masterServiceManagement.getServiceManagementList(params).pipe().subscribe(
      (res: any) => {
        //this.service_list = res.results;
        this.rows = res.results;
      },
      err => {
        this.toastr.error(err.error.msg, '', { timeOut: 1000 });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  deleteItems(item:any) {
    console.log(item);
    const deletePayload = {
      id: item.id, 
    };
    this.masterServiceManagement.deleteServiceManagementList(deletePayload).subscribe({
      next: (response) => {
        this.toastr.success('Item Deleted Successfully!', '', { timeOut: 1000 });
        this.getServiceManagementList();
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
    console.log(item);
    this.dialog.open(AddNewServicesComponent, {
      data: item,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getServiceManagementList();
    });
  }

  updateFilter(event?:any) {
    const val = event.target.value.toLowerCase();
    let searchItem: any = this.rows.filter(function (item:any) {
      return item.name.toLowerCase().indexOf(val) !== -1 || 
             item.description.toLowerCase().indexOf(val) !== -1 || 
             item.caption_text.toLowerCase().indexOf(val) !== -1 ||  
             item.status.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    if (val){
      this.rows = searchItem;
    }
    else if (val === ''){
      this.getServiceManagementList();
    }
    // this.table.offset = 0;
  } 

}
