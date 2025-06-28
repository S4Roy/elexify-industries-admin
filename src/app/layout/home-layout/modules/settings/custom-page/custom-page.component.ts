import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../../../../core/services/settings.service';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import * as Global from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-custom-page',
  imports: [MenuComponent, NgFor, NgIf, DatePipe, PaginationComponent],
  templateUrl: './custom-page.component.html',
  styleUrl: './custom-page.component.scss',
})
export class CustomPageComponent {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.fetchCustomPageList();
    this.checkPermission();
  }
  addItem(data: any = null) {
    if (data) {
      this.router.navigateByUrl('/settings/custom-page/update/' + data?.id);
    } else {
      this.router.navigateByUrl('/settings/custom-page/add');
    }
  }
  fetchCustomPageList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.customPageList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteCustomPage({ page_id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Page Deleted Successfully`);
        this.fetchCustomPageList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchCustomPageList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService
      .checkPermission({ sec: 'setting', sub_sec: 'static_page' })
      .subscribe({
        next: (res: any) => {
          const { sub_section_name } = res?.results[0];
          const { permissions } = sub_section_name[0];
          this.permissions = permissions;
        },
      });
  }
}
