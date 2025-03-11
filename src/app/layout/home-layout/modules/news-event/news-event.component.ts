import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { MasterServiceManagementService } from '../../../../core/services/master-service-management.service';
import { MasterService } from '../../../../core/services/master.service';
import { AddNewServicesComponent } from '../services/add-new-services/add-new-services.component';
import { HttpService } from '../../../../core/services/http.service';
import { AddNewsEventComponent } from './add-news-event/add-news-event.component';

@Component({
  selector: 'app-news-event',
  templateUrl: './news-event.component.html',
  styleUrls: ['./news-event.component.css'],
  imports: [NgFor, NgIf, RouterOutlet, NgxDatatableModule, MatMenuModule],

})
export class NewsEventComponent implements OnInit {

  listUrl: any = 'admin/news/list';
  // addUrl: string = 'admin/news/add';
  // editUrl: string = 'admin/news/edit';
  deleteUrl: string = 'admin/news/delete';

  rows: any[] = [];
  columns:any[] = [
    { name: 'Title', prop: 'title' },
    { name: 'Description', prop: 'description' },
    { name: 'Status', prop: 'status' },
    { name: 'Action', prop: 'action' },
  ];
  ColumnMode = ColumnMode;
  temp: any[] = [];

  constructor(private httpService: HttpService, 
              private toastr: ToastrService,
              private dialog: MatDialog) {  }

  ngOnInit() {
    this.getAwardsList();
  }

  getAwardsList(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page_size', '0');
    this.httpService.get(this.listUrl, params).pipe().subscribe(
      (res: any) => {
        this.rows = res.results;
      },
      err => {
        this.toastr.error(err.error.msg, '', { timeOut: 1000 });
      });
  }

  updateFilter(event?:any) {
    const val = event.target.value.toLowerCase();
    let searchItem: any = this.rows.filter(function (item:any) {
      return item.title.toLowerCase().indexOf(val) !== -1 || 
              item.description.toLowerCase().indexOf(val) !== -1 ||  
              item.status.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    if (val){
      this.rows = searchItem;
    }
    else if (val === ''){
      this.getAwardsList();
    }
    // this.table.offset = 0;
  } 

  addItem(data: any = null) {
    this.dialog.open(AddNewsEventComponent, {
      data: data,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getAwardsList();
    });
  }

  editItem(item:any){
    this.dialog.open(AddNewsEventComponent, {
      data: item,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getAwardsList();
    });
  }

  deleteItems(item:any) {
    const payload = {
      id: item.id, 
    };
    this.httpService.post(this.deleteUrl, payload).subscribe({
      next: (response) => {
        this.toastr.success('Item Deleted Successfully!', '', { timeOut: 1000 });
        this.getAwardsList();
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
