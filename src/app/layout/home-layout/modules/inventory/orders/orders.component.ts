import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import PaginationOptions from 'app/core/models/PaginationOptions';
import { MasterService } from 'app/core/services/master.service';
import { PaginationComponent } from 'app/layout/home-layout/includes/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';
import { MenuComponent } from 'app/layout/home-layout/includes/menu/menu.component';
import * as Global from 'app/global';
import { InventoryService } from 'app/core/services/inventory.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import FilterOptions from 'app/core/models/FilterOptions';
import { OrderDetailsComponent } from './order-details/order-details.component';
@Component({
  selector: 'app-orders',
  imports: [NgFor, NgIf, PaginationComponent, DatePipe, CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  filterOption: FilterOptions;
  constructor(
    private dialog: MatDialog,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.filterOption = Global.resetTableFilterOptions();
    // this.checkPermission();
    this.route.paramMap.subscribe((params) => {
      this.filterOption.category = params.get('slug');
      this.fetchOrderList();
    });
  }
  ngOnInit(): void {}
  addItem(data: any = null) {}
  stockItem(data: any = null) {}
  fetchOrderList() {
    let params = new URLSearchParams();
    if (this.paginationOption.limit) {
      params.set('limit', String(this.paginationOption.limit));
    }
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    if (this.filterOption.category) {
      params.set('category', this.filterOption.category);
    }
    if (this.filterOption.search_key) {
      params.set('search_key', this.filterOption.search_key);
    }

    this.inventoryService.orderList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = {
          ...res?.data,
        };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    // this.inventoryService.deleteProduct({ _id: item._id }).subscribe({
    //   next: (res: any) => {
    //     this.toastr.success(res?.body?.message);
    //     this.fetchOrderList();
    //   },
    //   error: (err: any) => {},
    // });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchOrderList();
  }
  permissions: any = ['add', 'edit', 'delete'];
  checkPermission() {
    // this.settingService.checkPermission({ sec: 'award' }).subscribe({
    //   next: (res: any) => {
    //     const { permissions } = res?.results[0];
    //     this.permissions = permissions;
    //   },
    // });
  }
  orderDetails(item: any) {
    this.router.navigateByUrl('/inventory/orders/' + item?._id);
    // this.dialog.open(OrderDetailsComponent, {
    //   data: item,
    //   width: '800px',
    // });
  }
}
