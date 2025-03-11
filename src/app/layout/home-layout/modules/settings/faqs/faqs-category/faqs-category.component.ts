import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NewFaqCategoryComponent } from './new-faq-category/new-faq-category.component';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../../../../../core/services/settings.service';
import PaginationOptions from '../../../../../../core/models/PaginationOptions';
import * as Global from '../../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../../includes/pagination/pagination.component';
@Component({
  selector: 'app-faqs-category',
  imports: [MenuComponent, NgFor, NgIf, DatePipe, PaginationComponent],
  templateUrl: './faqs-category.component.html',
  styleUrl: './faqs-category.component.scss',
})
export class FaqsCategoryComponent {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private toastr: ToastrService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.checkPermission();
    this.fetchFaqCategoryList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(NewFaqCategoryComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchFaqCategoryList();
        }
      });
  }
  fetchFaqCategoryList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.faqCategoryList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteFaqCategory({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Category Deleted Successfully`);
        this.fetchFaqCategoryList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchFaqCategoryList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService
      .checkPermission({ sec: 'setting', sub_sec: 'faq' })
      .subscribe({
        next: (res: any) => {
          const { sub_section_name } = res?.results[0];
          const { permissions } = sub_section_name[0];          
          this.permissions = permissions;
        },
      });
  }
}
