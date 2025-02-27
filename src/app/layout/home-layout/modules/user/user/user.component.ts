import { Component } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { MatDialog } from '@angular/material/dialog';
import * as Global from '../../../../../global';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../../core/services/settings.service';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';

@Component({
  selector: 'app-user',
  imports: [MenuComponent, NgFor, NgIf, RouterOutlet,PaginationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private toastr: ToastrService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.fetchUserList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(AddNewUserComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchUserList();
        }
      });
  }
  fetchUserList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.userList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteUser({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`User Deleted Successfully`);
        this.fetchUserList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchUserList();
  }
}
