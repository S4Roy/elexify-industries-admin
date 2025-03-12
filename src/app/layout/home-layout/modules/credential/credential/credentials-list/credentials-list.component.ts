import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SettingsService } from '../../../../../../core/services/settings.service';
import PaginationOptions from '../../../../../../core/models/PaginationOptions';
import * as Global from '../../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../../includes/pagination/pagination.component';
import FilterOptions from '../../../../../../core/models/FilterOptions';
import { NewCredentialsComponent } from './new-credentials/new-credentials.component';

@Component({
  selector: 'app-credentials-list',
  imports: [NgIf, NgFor, MenuComponent,PaginationComponent],
  templateUrl: './credentials-list.component.html',
  styleUrl: './credentials-list.component.scss'
})
export class CredentialsListComponent {
Global = Global;
  category_list: any = [];
  item_list: any = [];
  paginationOption: PaginationOptions;
  filterOption: FilterOptions;
  hideElement: boolean[] = [];
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private toastr: ToastrService
  ) {
    this.filterOption = Global.resetTableFilterOptions();
    this.paginationOption = Global.resetPaginationOptions();
    this.checkPermission();
    this.fetchCredentialsCategoryList();
    this.fetchCredentialsList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(NewCredentialsComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchCredentialsList();
        }
      });
  }
  fetchCredentialsList() {
    let params = new URLSearchParams();
    params.set('limit', '1000');
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    if (this.filterOption.list_type) {
      params.set('category_id', String(this.filterOption.list_type));
    }
    this.settingService.credentialList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteCredential({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Credentials Deleted Successfully`);
        this.fetchCredentialsList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchCredentialsList();
  }
  fetchCredentialsCategoryList() {
    let params = new URLSearchParams();
    params.set('limit', '100');
    this.settingService.credentialsCategoryList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.category_list = results ?? [];
        // this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  onlistTypeChange(item: any = null) {
    this.filterOption.list_type = item.id;
    this.paginationOption = Global.resetPaginationOptions();
    this.fetchCredentialsList();
  }
  toogleRow(i: number) {
    this.hideElement[i] = !this.hideElement[i];
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
