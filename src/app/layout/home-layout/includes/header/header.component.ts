import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { HelpersService } from '../../../../core/services/helpers.service';
import { DialogService } from '../../../../core/services/dialog.service';
import { ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ApiService } from 'app/core/services/api.service';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() isNavOpen: boolean = true;
  @Output() toggleSideNav = new EventEmitter<boolean>();
  total_unread_record: any = null;
  userDetails: any = null;
  constructor(
    public helperService: HelpersService,
    private dialogService: DialogService,
    private authService: AuthService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    this.userDetails = this.helperService.userDetails();
    // this.fetchNotificationList()
  }
  signOut(): void {
    const dialogData: ConfirmDialogData = {
      title: 'Are you sure?',
      message: 'You want to sign out?',
      saveText: 'Sign Out',
      cancelText: 'Cancel',
    };
    this.dialogService.confirmDialog(dialogData).subscribe((result: any) => {
      if (result?.confirm) {
        this.authService.userLogout();
      }
    });
  }
  changePassword() {
    this.dialog
      .open(ChangePasswordComponent, {
        data: { userDetails: this.userDetails },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
        }
      });
  }
  showNotifications() {
    this.dialog
      .open(NotificationsComponent, {
        data: { userDetails: this.userDetails },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchNotificationList();
        }
      });
  }
  fetchNotificationList() {
    let params: URLSearchParams = new URLSearchParams();
    this.apiService.notificationList(params).subscribe({
      next: (res: any) => {
        const {
          results,
          limit,
          page,
          total_pages,
          total_records,
          total_unread_record,
        } = res;
        this.total_unread_record = total_unread_record;
        console.log(total_unread_record);
      },
    });
  }
}
