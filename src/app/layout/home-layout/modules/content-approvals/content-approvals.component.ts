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
@Component({
  selector: 'app-content-approvals',
  imports: [
    NgFor,
    NgIf,
    PaginationComponent,
    MenuComponent,
    FormsModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './content-approvals.component.html',
  styleUrl: './content-approvals.component.scss',
})
export class ContentApprovalsComponent {
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
    this.fetchContentApprovalList();
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
        this.fetchContentApprovalList();
      });
  }

  addItem(data: any = null) {
    this.masterService.contentApprovalDetails(data.uuid).subscribe({
      next: (res: any) => {
        const dialogData = {
          ...res?.changes_data,
          previous_data: res?.previous_data,
          request_details: res?.request_details,
        };
  
        switch (data.request_for) {
          case 'teams':
            this.dialog
              .open(AddTeamMemberComponent, {
                data: dialogData,
                disableClose: true,
              })
              .afterClosed()
              .subscribe((res: any) => {
                if (res) {
                  this.fetchContentApprovalList();
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
                  this.fetchContentApprovalList();
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
  fetchContentApprovalList() {
    let params = new URLSearchParams();
    if (this.filterOption.name) {
      params.set('name', this.filterOption.name);
    }
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.masterService.contentApprovalList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchContentApprovalList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'content_approval' }).subscribe({
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
    this.fetchContentApprovalList();
  }
}
