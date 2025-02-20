import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddAwardsComponent } from './add-awards/add-awards.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-awards',
  imports: [NgFor, NgIf, RouterOutlet, NgxDatatableModule, MatMenuModule],
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  addUrl: string = 'admin/award/add';
  editUrl: string = 'admin/award/edit';
  deleteUrl: string = 'admin/award/delete';
  listUrl: any = 'admin/award/list';

  rows: any[] = [];
  columns:any[] = [
    { name: 'Title', prop: 'title' },
    { name: 'Status', prop: 'status' },
    { name: 'Image', prop: 'award_images' },
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
      return item.name.toLowerCase().indexOf(val) !== -1 || 
             item.description.toLowerCase().indexOf(val) !== -1 || 
             item.caption_text.toLowerCase().indexOf(val) !== -1 ||  
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
    this.dialog.open(AddAwardsComponent, {
      data: data,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getAwardsList();
    });
  }

  editItem(item:any){
    this.dialog.open(AddAwardsComponent, {
      data: item,
      disableClose: true,
    })
    .afterClosed().subscribe((res: any) => {
      this.getAwardsList();
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
