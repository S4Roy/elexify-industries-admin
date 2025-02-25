import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../../core/services/http.service';
import { AddEnquiryManagementComponent } from './add-enquiry-management/add-enquiry-management.component';

@Component({
  selector: 'app-enquiry-management',
  templateUrl: './enquiry-management.component.html',
  styleUrls: ['./enquiry-management.component.css'],
  imports: [NgFor, NgIf, RouterOutlet, NgxDatatableModule, MatMenuModule],
})
export class EnquiryManagementComponent implements OnInit {

  listUrl: any = 'admin/inquiry/list';
  // addUrl: string = 'admin/inquiry/add';
  // editUrl: string = 'admin/inquiry/edit';
  deleteUrl: string = 'admin/inquiry/delete';

  rows: any[] = [];
  columns:any[] = [
    { name: 'Name', prop: 'name' },
    { name: 'Email', prop: 'email' },
    { name: 'Message', prop: 'message' },
    { name: 'Purpose Type', prop: 'purpose_type' },
    { name: 'Action', prop: 'action' },
  ];
  ColumnMode = ColumnMode;
  temp: any[] = [];

  constructor(private httpService: HttpService, 
              private toastr: ToastrService,
              private dialog: MatDialog) {  }

  ngOnInit() {
    this.getEnquiryList();
  }

  getEnquiryList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page_size', '0');
    this.httpService.get(this.listUrl, params).pipe().subscribe(
      (res: any) => {
        console.log(res);
        this.rows = res.results;
      },
      err => {
        this.toastr.error(err.error.msg, '', { timeOut: 1000 });
      });
  }

  // updateFilter(event?:any) {
  //   const val = event.target.value.toLowerCase();
  //   let searchItem: any = this.rows.filter(function (item:any) {
  //     return item.name.toLowerCase().indexOf(val) !== -1 || 
  //            item.email.toLowerCase().indexOf(val) !== -1 ||  
  //            item.message.toLowerCase().indexOf(val) !== -1 || 
  //            item.purpose_type.toLowerCase().indexOf(val) !== -1 || !val ;
  //   });
  //   if (val){
  //     this.rows = searchItem;
  //   }
  //   else if (val === ''){
  //     this.getEnquiryList();
  //   }
  //   // this.table.offset = 0;
  // } 

  remarks(item:any){
    console.log(item);
    this.dialog.open(AddEnquiryManagementComponent, {
      data: item,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getEnquiryList();
    });
  }

  deleteItems(item:any) {
    console.log(item);
    const payload = {
      id: item.id, 
    };
    this.httpService.post(this.deleteUrl, payload).subscribe({
      next: (response) => {
        this.toastr.success('Item Deleted Successfully!', '', { timeOut: 1000 });
        this.getEnquiryList();
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

}
