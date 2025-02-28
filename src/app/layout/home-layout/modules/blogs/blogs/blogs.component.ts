import { Component } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as Global from '../../../../../global';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../../core/services/settings.service';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';
import { NewBlogComponent } from './new-blog/new-blog.component';

@Component({
  selector: 'app-blogs',
  imports: [MenuComponent, NgFor, NgIf, RouterOutlet,PaginationComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
Global = Global;
  item_list: any = [];
  paginationOption: PaginationOptions;
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private toastr: ToastrService
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.blogList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(NewBlogComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.blogList();
        }
      });
  }
  blogList() {
    let params = new URLSearchParams();
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    this.settingService.blogList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.item_list = results ?? [];
        this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteBlog({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(` Deleted Successfully`);
        this.blogList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.blogList();
  }
}

