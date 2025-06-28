import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import PaginationOptions from 'app/core/models/PaginationOptions';
import { MasterService } from 'app/core/services/master.service';
import { PaginationComponent } from 'app/layout/home-layout/includes/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';
import { MenuComponent } from 'app/layout/home-layout/includes/menu/menu.component';
import * as Global from 'app/global';
import { NewCategoryComponent } from './new-category/new-category.component';
import { InventoryService } from 'app/core/services/inventory.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import FilterOptions from 'app/core/models/FilterOptions';

@Component({
  selector: 'app-categories',
  imports: [NgFor, NgIf, PaginationComponent, MenuComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  filterOption: FilterOptions;
  constructor(
    private dialog: MatDialog,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.filterOption = Global.resetTableFilterOptions();
    // this.checkPermission();
    this.route.paramMap.subscribe((params) => {
      this.filterOption.slug = params.get('slug');
      this.fetchCategoryList();
    });
  }
  ngOnInit(): void {}
  addItem(data: any = null) {
    this.dialog
      .open(NewCategoryComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchCategoryList();
        }
      });
  }
  fetchCategoryList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    if (this.filterOption.slug) {
      params.set('slug', this.filterOption.slug);
    }
    this.inventoryService.categoryList(params).subscribe({
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
    this.inventoryService.deleteCategory({ _id: item._id }).subscribe({
      next: (res: any) => {
        console.log(res);

        this.toastr.success(res?.body?.message);
        this.fetchCategoryList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchCategoryList();
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
}
