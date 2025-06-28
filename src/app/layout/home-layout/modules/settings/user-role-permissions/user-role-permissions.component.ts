import { Component, Input } from '@angular/core';

import * as Global from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import { SettingsService } from '../../../../../core/services/settings.service';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NewUserRolePermissionsComponent } from './new-user-role-permissions/new-user-role-permissions.component';

@Component({
  selector: 'app-user-role-permissions',
  imports: [NgFor, NgIf, PaginationComponent],
  templateUrl: './user-role-permissions.component.html',
  styleUrl: './user-role-permissions.component.scss',
})
export class UserRolePermissionsComponent {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private toastr: ToastrService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.contactPurposeList();
  }

  addItem(data: any = null) {
    this.dialog
      .open(NewUserRolePermissionsComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.contactPurposeList();
        }
      });
  }
  contactPurposeList() {
    let params = new URLSearchParams();
    params.set('sort_by', 'id');
    params.set('sort_order', 'asc');
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.roleList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteContactPurpose({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Purpose Deleted Successfully`);
        this.contactPurposeList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.contactPurposeList();
  }
}
