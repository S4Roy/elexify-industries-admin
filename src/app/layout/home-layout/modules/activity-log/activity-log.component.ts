import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import FilterOptions from 'app/core/models/FilterOptions';
import PaginationOptions from 'app/core/models/PaginationOptions';
import { MasterService } from 'app/core/services/master.service';
import { SettingsService } from 'app/core/services/settings.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginationComponent } from 'app/layout/home-layout/includes/pagination/pagination.component';
import { MenuComponent } from 'app/layout/home-layout/includes/menu/menu.component';
import * as Global from 'app/global';
import { AddTeamMemberComponent } from '../teams/teams/add-team-member/add-team-member.component';
import { AddClienteleComponent } from '../clientele/add-clientele/add-clientele.component';
import { AddNewServicesComponent } from '../services/add-new-services/add-new-services.component';

@Component({
  selector: 'app-activity-log',
  imports: [
    NgFor,
    NgIf,
    PaginationComponent,
    MenuComponent,
    FormsModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent {
  Global = Global;
  showMore: boolean[] = [];
  showRemarksMore: boolean[] = [];
  item_list: any = [];
  paginationOption: PaginationOptions;
  filterOption: FilterOptions;
  searchSubject = new Subject<string>();
  search_key: string | null = null;

  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private masterService: MasterService,
    private toastr: ToastrService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.filterOption = Global.resetTableFilterOptions();
    this.checkPermission();
    this.fetchActivityLogList();
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300), // Adjust debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((data: any) => {
        this.paginationOption = Global.resetPaginationOptions();
        this.filterOption.name = this.search_key;
        this.fetchActivityLogList();
      });
  }

  addItem(data: any = null) {
    this.masterService.activityDetails(data.uuid).subscribe({
      next: (res: any) => {
        const dialogData = {
          ...res?.changes_data,
          previous_data: res?.previous_data,
          request_details: res?.request_details,
          isViewOnly: true,
        };

        switch (data.request_for) {
          case 'services':
            this.dialog
              .open(AddNewServicesComponent, {
                data: dialogData,
                disableClose: true,
              })
              .afterClosed()
              .subscribe((res: any) => {
                if (res) {
                  this.fetchActivityLogList();
                }
              });
            break;

          case 'teams':
            this.dialog
              .open(AddTeamMemberComponent, {
                data: dialogData,
                disableClose: true,
              })
              .afterClosed()
              .subscribe((res: any) => {
                if (res) {
                  this.fetchActivityLogList();
                }
              });
            break;

          case 'clients':
            this.dialog
              .open(AddClienteleComponent, {
                data: dialogData,
                disableClose: true,
              })
              .afterClosed()
              .subscribe((res: any) => {
                if (res) {
                  this.fetchActivityLogList();
                }
              });
            break;

          default:
            this.toastr.warning(`Unknown request type: ${data.request_for}`);
            break;
        }
      },
    });
  }
  fetchActivityLogList() {
    let params = new URLSearchParams();
    if (this.filterOption.name) {
      params.set('name', this.filterOption.name);
    }
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.masterService.activityList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchActivityLogList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'activity_log' }).subscribe({
      next: (res: any) => {
        const { permissions } = res?.results[0];
        this.permissions = permissions;
      },
    });
  }
  clearFilter() {
    this.search_key = null;
    this.paginationOption = Global.resetPaginationOptions();
    this.filterOption = Global.resetTableFilterOptions();
    this.fetchActivityLogList();
  }
}
