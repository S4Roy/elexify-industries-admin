import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../../../../../core/services/settings.service';
import PaginationOptions from '../../../../../../core/models/PaginationOptions';
import * as Global from '../../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../../includes/pagination/pagination.component';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';
@Component({
  selector: 'app-certificate',
  imports: [MenuComponent, NgFor, NgIf, PaginationComponent],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss',
})
export class CertificateComponent {
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
    this.fetchCredentialsCertificateList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(NewCertificateComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchCredentialsCertificateList();
        }
      });
  }
  fetchCredentialsCertificateList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.credentialsCertificateList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteCredentialCertificate({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Certificate Deleted Successfully`);
        this.fetchCredentialsCertificateList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchCredentialsCertificateList();
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
