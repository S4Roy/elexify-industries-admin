import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from '../../includes/menu/menu.component';
import { PageService } from '../../../../core/services/page.service';
import * as Global from '../../../../global';
import PaginationOptions from '../../../../core/models/PaginationOptions';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../core/services/settings.service';
import { NewFaqCategoryComponent } from '../settings/faqs/faqs-category/new-faq-category/new-faq-category.component';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from '../../includes/pagination/pagination.component';

@Component({
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    MenuComponent,
    MatTooltipModule,
    PaginationComponent,
  ],
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private pageService: PageService,
    private toastr: ToastrService,
    private settingService: SettingsService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.checkPermission();
    this.fetchGalleryList();
  }
  ngOnInit(): void {}
  addItem(data: any = null) {
    this.dialog
      .open(AddGalleryComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchGalleryList();
        }
      });
  }
  fetchGalleryList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.pageService.galleryList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.pageService.deleteMedia({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Media Deleted Successfully`);
        this.fetchGalleryList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchGalleryList();
  }
  permissions: any = [];
  checkPermission() {
    this.settingService.checkPermission({ sec: 'gallery' }).subscribe({
      next: (res: any) => {
        const { permissions } = res?.results[0];
        this.permissions = permissions;
      },
    });
  }
}
