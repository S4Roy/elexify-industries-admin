import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventoryService } from 'app/core/services/inventory.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  recentOrders: any = [];
  data: any = {};
  constructor(private inventoryService: InventoryService) {}
  ngOnInit() {
    this.fetchOrderStats();
  }
  fetchOrderStats() {
    this.inventoryService
      .orderStats(new URLSearchParams())
      .subscribe((res: any) => {
        this.data.status = res?.data;
        this.data.total = 0;
        this.data.status.forEach((element: any) => {
          this.data.total += element?.count ?? 0;
        });
      });
  }
}
