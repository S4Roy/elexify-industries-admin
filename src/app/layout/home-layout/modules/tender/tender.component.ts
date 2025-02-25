import { Component, OnInit } from '@angular/core';
import { AddTenderComponent } from './add-tender/add-tender.component';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterOutlet } from '@angular/router';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../../core/services/http.service';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css'],
  imports: [NgFor, NgIf, RouterOutlet, NgxDatatableModule, MatMenuModule],
})
export class TenderComponent implements OnInit {

  listUrl: any = 'admin/tender/tender-list';
  // addUrl: string = 'admin/tender/add';
  // editUrl: string = 'admin/tender/edit';
  deleteUrl: string = 'admin/tender/delete';

  rows: any[] = [];
  columns:any[] = [
    { name: 'Tender Name', prop: 'tender_name' },
    { name: 'Tender No', prop: 'tender_no' },
    { name: 'Description', prop: 'description' },
    { name: 'Tender Status', prop: 'tender_status' },
    { name: 'Action', prop: 'action' },
  ];
  ColumnMode = ColumnMode;
  temp: any[] = [];

  constructor(private httpService: HttpService, 
              private toastr: ToastrService,
              private dialog: MatDialog,private router:Router) {  }

  ngOnInit() {
    this.getTenderList();
  }

  getTenderList(){
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
      return item.tender_name.toLowerCase().indexOf(val) !== -1 || 
              item.tender_no.toLowerCase().indexOf(val) !== -1 ||  
              item.description.toLowerCase().indexOf(val) !== -1 || 
              item.tender_status.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    if (val){
      this.rows = searchItem;
    }
    else if (val === ''){
      this.getTenderList();
    }
    // this.table.offset = 0;
  } 

  addItem(data: any = null) {
    this.router.navigateByUrl("/tender/add")
  }

  editItem(item:any){
    this.router.navigateByUrl("/tender/edit/"+item?.id)

  }

  deleteItems(item:any) {
    console.log(item);
    const payload = {
      id: item.id, 
    };
    this.httpService.post(this.deleteUrl, payload).subscribe({
      next: (response) => {
        this.toastr.success('Item Deleted Successfully!', '', { timeOut: 1000 });
        this.getTenderList();
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
