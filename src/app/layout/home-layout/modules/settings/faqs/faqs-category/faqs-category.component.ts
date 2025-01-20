import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import { NewFaqCategoryComponent } from './new-faq-category/new-faq-category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-faqs-category',
  imports: [MenuComponent, NgFor, NgIf],
  templateUrl: './faqs-category.component.html',
  styleUrl: './faqs-category.component.scss',
})
export class FaqsCategoryComponent {
  item_list: any = [];
  constructor(private dialog: MatDialog) {}
  addItem(data: any = null) {
    this.dialog
      .open(NewFaqCategoryComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
