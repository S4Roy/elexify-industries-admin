import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../../../../../core/services/settings.service';
import PaginationOptions from '../../../../../../core/models/PaginationOptions';
import * as Global from '../../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../../includes/pagination/pagination.component';
import { NewCategoryComponent } from './new-category/new-category.component';
@Component({
  selector: 'app-category',
  imports: [MenuComponent, NgFor, NgIf, PaginationComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
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
    this.fetchCredentialsCategoryList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(NewCategoryComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchCredentialsCategoryList();
        }
      });
  }
  fetchCredentialsCategoryList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.credentialsCategoryList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteCredentialCategory({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Category Deleted Successfully`);
        this.fetchCredentialsCategoryList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchCredentialsCategoryList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService
      .checkPermission({ sec: 'credential' })
      .subscribe({
        next: (res: any) => {
          const { permissions } = res?.results[0];
          this.permissions = permissions;
        },
      });
  }
}
