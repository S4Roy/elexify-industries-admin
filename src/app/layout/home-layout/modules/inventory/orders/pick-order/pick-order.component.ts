import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import FilterOptions from 'app/core/models/FilterOptions';
import { InventoryService } from 'app/core/services/inventory.service';
import * as Global from 'app/global';
@Component({
  selector: 'app-pick-order',
  imports: [CurrencyPipe, NgFor, NgIf, DatePipe],
  templateUrl: './pick-order.component.html',
  styleUrl: './pick-order.component.scss',
})
export class PickOrderComponent {
  Global = Global;
  filterOption: FilterOptions;
  data: any = null;
  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {
    this.filterOption = Global.resetTableFilterOptions();
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.filterOption._id = params.get('_id');
      if (this.filterOption._id) {
        this.fetchOrderList();
      }
    });
  }
  fetchOrderList() {
    let params = new URLSearchParams();
    params.set('_id', String(this.filterOption._id));
    this.inventoryService.orderList(params).subscribe({
      next: (res: any) => {
        this.data = res?.data;
      },
      error: (err) => {},
    });
  }
}
