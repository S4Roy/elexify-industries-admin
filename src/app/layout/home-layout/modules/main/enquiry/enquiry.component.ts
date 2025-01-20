import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';

@Component({
  selector: 'app-enquiry',
  imports: [NgFor, MenuComponent, NgIf],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.scss',
})
export class EnquiryComponent {
  @Input() dashboard: boolean = false;
  item_list: any = [];
  constructor() {
    this.item_list = [1, 2, 3, 4, 4, 5, 5, 6, 6];
  }
  ngOnChanges() {
    if (this.dashboard) {
      this.item_list = [1, 2, 3];
    }
  }
}
