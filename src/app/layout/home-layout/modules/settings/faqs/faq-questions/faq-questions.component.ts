import { Component } from '@angular/core';
import { NewFaqQuestionComponent } from './new-faq-question/new-faq-question.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SettingsService } from '../../../../../../core/services/settings.service';
import PaginationOptions from '../../../../../../core/models/PaginationOptions';
import * as Global from '../../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../../includes/pagination/pagination.component';
import FilterOptions from '../../../../../../core/models/FilterOptions';

@Component({
  selector: 'app-faq-questions',
  imports: [NgIf, NgFor, MenuComponent],
  templateUrl: './faq-questions.component.html',
  styleUrl: './faq-questions.component.scss',
})
export class FaqQuestionsComponent {
  Global = Global;
  category_list: any = [];
  item_list: any = [];
  paginationOption: PaginationOptions;
  filterOption: FilterOptions;
  hideElement: boolean[] = [];
  constructor(
    private dialog: MatDialog,
    private settingService: SettingsService,
    private toastr: ToastrService
  ) {
    this.filterOption = Global.resetTableFilterOptions();
    this.paginationOption = Global.resetPaginationOptions();
    this.checkPermission();
    this.fetchFaqCategoryList();
    this.fetchFaqList();
  }
  addItem(data: any = null) {
    this.dialog
      .open(NewFaqQuestionComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchFaqList();
        }
      });
  }
  fetchFaqList() {
    let params = new URLSearchParams();
    params.set('limit', '1000');
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    if (this.filterOption.list_type) {
      params.set('category_id', String(this.filterOption.list_type));
    }
    this.settingService.faqList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {},
    });
  }
  deleteItem(item: any) {
    this.settingService.deleteFAQ({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`FAQ Deleted Successfully`);
        this.fetchFaqList();
      },
      error: (err: any) => {},
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.fetchFaqList();
  }
  fetchFaqCategoryList() {
    let params = new URLSearchParams();
    params.set('limit', '100');
    this.settingService.faqCategoryList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.category_list = results ?? [];
        // this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  onlistTypeChange(item: any = null) {
    this.filterOption.list_type = item.id;
    this.paginationOption = Global.resetPaginationOptions();
    this.fetchFaqList();
  }
  toogleRow(i: number) {
    this.hideElement[i] = !this.hideElement[i];
  }
  permissions: any = [];
  checkPermission() {
    this.settingService
      .checkPermission({ sec: 'setting', sub_sec: 'faq' })
      .subscribe({
        next: (res: any) => {
          const { sub_section_name } = res?.results[0];
          const { permissions } = sub_section_name[0];
          this.permissions = permissions;
        },
      });
  }
}
