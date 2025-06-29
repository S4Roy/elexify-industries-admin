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
import { DeviceDetectorService } from 'app/core/services/device-detector.service';
import { NavService } from 'app/core/services/nav.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() isNavOpen: boolean = true;
  @Output() toggleSideNav = new EventEmitter<boolean>();
  public searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  total_unread_record: any = null;
  userDetails: any = null;
  searchTerm: any = null;

  constructor(
    public helperService: HelpersService,
    private dialogService: DialogService,
    private authService: AuthService,
    private apiService: ApiService,
    private dialog: MatDialog,
    public device: DeviceDetectorService,
    private navService: NavService
  ) {
    this.userDetails = this.helperService.userDetails();
    // this.fetchNotificationList()
  }
  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term: string) => {
        this.helperService.updateSearchTerm(term);
      });
  }

  onSearchChange(event: any): void {
    this.searchSubject.next(
      event?.target?.value ? event?.target?.value?.trim() : ''
    );
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject.next('');
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
    // this.apiService.notificationList(params).subscribe({
    //   next: (res: any) => {
    //     const {
    //       results,
    //       limit,
    //       page,
    //       total_pages,
    //       total_records,
    //       total_unread_record,
    //     } = res;
    //     this.total_unread_record = total_unread_record;
    //     console.log(total_unread_record);
    //   },
    // });
  }
  toggleMenu() {
    this.navService.toggleMenu();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
  }
}
