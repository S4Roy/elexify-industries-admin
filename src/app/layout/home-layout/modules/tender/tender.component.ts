import { Component, OnInit } from '@angular/core';
import * as Global from '../../../../global';
import PaginationOptions from '../../../../core/models/PaginationOptions';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../includes/pagination/pagination.component';
import { MenuComponent } from '../../includes/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageService } from '../../../../core/services/page.service';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css'],
  imports: [
    PaginationComponent,
    MenuComponent,
    MatIconModule,
    NgFor,
    MatTooltipModule,
    NgIf,
    RouterModule,
    TitleCasePipe,
    DatePipe
  ],
})
export class TenderComponent implements OnInit {
  Global = Global;
  item_list: any = [];
  showMore : boolean [] = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private pageService: PageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.fetchTenderList();
  }
  ngOnInit(): void {}
  addItem(data: any = null) {
    this.router.navigateByUrl(
      '/tender/' + (data?.id ? 'edit/' + data.id : 'add')
    );
  }
  fetchTenderList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.pageService.tenderList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {
        this.item_list = [];
      },
    });
  }
  deleteItem(item: any) {
    this.pageService.deleteTender({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Deleted Successfully`);
        this.fetchTenderList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchTenderList();
  }
}
