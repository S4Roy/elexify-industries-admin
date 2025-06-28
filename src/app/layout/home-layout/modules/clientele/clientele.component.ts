import { Component, OnInit } from '@angular/core';
import * as Global from '../../../../global';
import PaginationOptions from '../../../../core/models/PaginationOptions';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../includes/pagination/pagination.component';
import { MenuComponent } from '../../includes/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddClienteleComponent } from './add-clientele/add-clientele.component';
import { MasterService } from '../../../../core/services/master.service';
import { SettingsService } from 'app/core/services/settings.service';

@Component({
  selector: 'app-clientele',
  templateUrl: './clientele.component.html',
  styleUrls: ['./clientele.component.css'],
  imports: [
    PaginationComponent,
    MenuComponent,
    MatIconModule,
    NgFor,
    MatTooltipModule,
    NgIf,
    RouterModule,
  ],
})
export class ClienteleComponent implements OnInit {
  Global = Global;
  showMore: boolean[] = [];
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private masterService: MasterService,
    private settingService: SettingsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.checkPermission();
    this.fetchClienteleList();
  }
  ngOnInit(): void {}
  addItem(data: any = null) {
    this.dialog
      .open(AddClienteleComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchClienteleList();
        }
      });
  }
  fetchClienteleList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.masterService.clienteleList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {
        this.item_list = [];
      },
    });
  }
  deleteItem(item: any) {
    this.masterService.deleteClientele({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Deleted Successfully`);
        this.fetchClienteleList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchClienteleList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'clientele' }).subscribe({
      next: (res: any) => {
        const { permissions } = res?.results[0];
        this.permissions = permissions;
      },
    });
  }
}
