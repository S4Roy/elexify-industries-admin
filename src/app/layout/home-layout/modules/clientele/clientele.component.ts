import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../../core/services/http.service';
import { AddAwardsComponent } from '../awards/add-awards/add-awards.component';
import { AddClienteleComponent } from './add-clientele/add-clientele.component';

@Component({
  selector: 'app-clientele',
  templateUrl: './clientele.component.html',
  styleUrls: ['./clientele.component.css'],
  imports: [NgFor, NgIf, RouterOutlet, NgxDatatableModule, MatMenuModule],
})
export class ClienteleComponent implements OnInit {

  listUrl: any = 'admin/clientele/list';
  // addUrl: string = 'admin/clientele/add';
  // editUrl: string = 'admin/clientele/edit';
  deleteUrl: string = 'admin/clientele/delete';

  rows: any[] = [];
  columns:any[] = [
    { name: 'Client Name', prop: 'client_name' },
    { name: 'Company Name', prop: 'company_name' },
    { name: 'Client Feedback', prop: 'client_feedback' },
    { name: 'Description', prop: 'description' },
    { name: 'status', prop: 'status' },
    { name: 'Action', prop: 'action' },
  ];
  ColumnMode = ColumnMode;
  temp: any[] = [];

  constructor(private httpService: HttpService, 
              private toastr: ToastrService,
              private dialog: MatDialog) {  }

  ngOnInit() {
    this.getList();
  }

  getList(){
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

  updateFilter(event?:any) {
    const val = event.target.value.toLowerCase();
    let searchItem: any = this.rows.filter(function (item:any) {
      return item.client_name.toLowerCase().indexOf(val) !== -1 ||
             item.company_name.toLowerCase().indexOf(val) !== -1 || 
             item.client_feedback.toLowerCase().indexOf(val) !== -1 ||  
             item.description.toLowerCase().indexOf(val) !== -1 ||  
             item.status.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    if (val){
      this.rows = searchItem;
    }
    else if (val === ''){
      this.getList();
    }
    // this.table.offset = 0;
  } 

  addItem(data: any = null) {
    this.dialog.open(AddClienteleComponent, {
      data: data,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getList();
    });
  }

  editItem(item:any){
    this.dialog.open(AddClienteleComponent, {
      data: item,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getList();
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
        this.getList();
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
