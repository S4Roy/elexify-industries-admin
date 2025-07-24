import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import FilterOptions from 'app/core/models/FilterOptions';
import { InventoryService } from 'app/core/services/inventory.service';
import * as Global from 'app/global';
import { NgxBarcode6Module } from 'ngx-barcode6';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { CommunicatorService } from 'app/core/services/communicator.service';

@Component({
  selector: 'app-order-packing',
  imports: [
    CurrencyPipe,
    NgFor,
    NgIf,
    DatePipe,
    NgxBarcode6Module,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './order-packing.component.html',
  styleUrl: './order-packing.component.scss',
})
export class OrderPackingComponent {
  Global = Global;
  filterOption: FilterOptions;
  formGroup!: FormGroup;
  data: any = null;
  @ViewChild('skuInput') skuInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private communicator: CommunicatorService
  ) {
    this.filterOption = Global.resetTableFilterOptions();
  }

  ngOnInit() {
    this.communicator.trigger$.subscribe((data) => {
      this.fetchOrderList();
    });
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
    this.inventoryService.orderDetails(params).subscribe({
      next: (res: any) => {
        this.data = res?.data;
        if (this.data?.picked_quantity != this.data?.ordered_quantity) {
          this.router.navigate(['pick-item'], { relativeTo: this.route });
        }
      },
      error: (err) => {},
    });
  }
  packItem() {
    this.router.navigate(['pack-item'], { relativeTo: this.route });
  }
}
