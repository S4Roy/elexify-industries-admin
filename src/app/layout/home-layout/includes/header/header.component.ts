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

@Component({
  selector: 'app-header',
  imports: [NgIf, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() isNavOpen: boolean = true;
  @Output() toggleSideNav = new EventEmitter<boolean>();
  userDetails: any = null;
  constructor(
    public helperService: HelpersService,
    private dialogService: DialogService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.userDetails = this.helperService.userDetails();
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
}
