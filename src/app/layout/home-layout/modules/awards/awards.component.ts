import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../../core/services/master.service';
import * as Global from '../../../../global';
import PaginationOptions from '../../../../core/models/PaginationOptions';
import { SettingsService } from '../../../../core/services/settings.service';
import { PaginationComponent } from '../../includes/pagination/pagination.component';
import { MenuComponent } from '../../includes/menu/menu.component';
import { AddAwardsComponent } from './add-awards/add-awards.component';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
  imports: [NgFor, NgIf, PaginationComponent, MenuComponent],
})
export class AwardsComponent implements OnInit {
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
    this.fetchAwardList();
  }
  ngOnInit(): void {}
  addItem(data: any = null) {
    this.dialog
      .open(AddAwardsComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchAwardList();
        }
      });
  }
  fetchAwardList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.masterService.awardList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.masterService.deleteAward({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Deleted Successfully`);
        this.fetchAwardList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchAwardList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'award' }).subscribe({
      next: (res: any) => {
        const { permissions } = res?.results[0];
        this.permissions = permissions;
      },
    });
  }
}
