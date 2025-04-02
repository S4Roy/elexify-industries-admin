import { Component, OnInit } from '@angular/core';
import * as Global from '../../../../global';
import PaginationOptions from '../../../../core/models/PaginationOptions';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../core/services/settings.service';
import { NewFaqCategoryComponent } from '../settings/faqs/faqs-category/new-faq-category/new-faq-category.component';
import { Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../includes/pagination/pagination.component';
import { MenuComponent } from '../../includes/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageService } from '../../../../core/services/page.service';

@Component({
  selector: 'app-career-management',
  imports: [
    PaginationComponent,
    MenuComponent,
    MatIconModule,
    NgFor,
    MatTooltipModule,
    NgIf,
    RouterModule,
    TitleCasePipe
  ],
  templateUrl: './career-management.component.html',
  styleUrls: ['./career-management.component.css'],
})
export class CareerManagementComponent implements OnInit {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private pageService: PageService,
    private toastr: ToastrService,
    private router: Router,
    private settingService:SettingsService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.checkPermission();
    this.fetchCareerList();
  }
  ngOnInit(): void {}
  addItem(data: any = null) {
    this.router.navigateByUrl(
      '/career/' + (data?.id ? 'edit/' + data.id : 'add')
    );
  }
  fetchCareerList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.pageService.careerList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {
        this.item_list =  [];

      },
    });
  }
  deleteItem(item: any) {
    this.pageService.deleteCareer({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Deleted Successfully`);
        this.fetchCareerList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchCareerList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'career' }).subscribe({
      next: (res: any) => {
        const { permissions } = res?.results[0];
        this.permissions = permissions;
      },
    });
  }
}
