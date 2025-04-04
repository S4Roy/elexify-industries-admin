import { Component, ViewChild } from '@angular/core';
import * as Global from '../../../../../global';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import { MasterService } from '../../../../../core/services/master.service';
import { SettingsService } from '../../../../../core/services/settings.service';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';
import { AddNewServicesComponent } from '../add-new-services/add-new-services.component';
import { MenuComponent } from '../../../includes/menu/menu.component';

@Component({
  selector: 'app-services',
  imports: [NgFor, NgIf, PaginationComponent, MenuComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private masterService: MasterService,
    private toastr: ToastrService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.checkPermission();
    this.fetchServices();
  }
  ngOnInit(): void {}
  addItem(data: any = null) {
    this.dialog
      .open(AddNewServicesComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchServices();
        }
      });
  }
  fetchServices() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.masterService.serviceList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.masterService.deleteService({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Deleted Successfully`);
        this.fetchServices();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchServices();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'service' }).subscribe({
      next: (res: any) => {
        const { permissions } = res?.results[0];
        this.permissions = permissions;
      },
    });
  }
}
