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

@Component({
  selector: 'app-activity-log',
  imports: [
    NgFor,
    NgIf,
    PaginationComponent,
    MenuComponent,
    FormsModule,
    MatIconModule,
    DatePipe
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
    this.fetchServices();
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
        this.fetchServices();
      });
  }

  addItem(data: any = null) {
    // this.dialog
    //   .open(AddEnquiryManagementComponent, {
    //     data: data,
    //     disableClose: true,
    //   })
    //   .afterClosed()
    //   .subscribe((res: any) => {
    //     if (res) {
    //       this.fetchServices();
    //     }
    //   });
  }
  fetchServices() {
    let params = new URLSearchParams();
    if (this.filterOption.name) {
      params.set('name', this.filterOption.name);
    }
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.masterService.enquiryList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.masterService.deleteEnquiry({ id: item.id }).subscribe({
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
    this.settingService.checkPermission({ sec: 'enquiry' }).subscribe({
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
    this.fetchServices();
  }
}
