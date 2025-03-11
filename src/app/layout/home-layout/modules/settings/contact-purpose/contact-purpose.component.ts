import { Component, Input } from '@angular/core';

import * as Global from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import { SettingsService } from '../../../../../core/services/settings.service';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NewContactPurposeComponent } from './new-contact-purpose/new-contact-purpose.component';

@Component({
  selector: 'app-contact-purpose',
  imports: [MenuComponent, NgFor, NgIf, PaginationComponent],
  templateUrl: './contact-purpose.component.html',
  styleUrl: './contact-purpose.component.scss',
})
export class ContactPurposeComponent {
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
    this.contactPurposeList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(NewContactPurposeComponent, {
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
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.contactPurposeList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
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
  permissions: any = [];
  checkPermission() {
    this.settingService
      .checkPermission({ sec: 'setting', sub_sec: 'contact_purpose' })
      .subscribe({
        next: (res: any) => {
          const { sub_section_name } = res?.results[0];
          const { permissions } = sub_section_name[0];          
          this.permissions = permissions;
        },
      });
  }
}
