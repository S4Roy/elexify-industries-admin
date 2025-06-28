import { Component } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as Global from '../../../../../global';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../../core/services/settings.service';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';

@Component({
  selector: 'app-teams',
  imports: [MenuComponent, NgFor, NgIf, RouterOutlet, PaginationComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent {
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
    this.fetchUserList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(AddTeamMemberComponent, {
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
    this.settingService.teamList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteTeamMember({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Member Deleted Successfully`);
        this.fetchUserList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchUserList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'team' }).subscribe({
      next: (res: any) => {
        const { permissions } = res?.results[0];
        this.permissions = permissions;
      },
    });
  }
}
