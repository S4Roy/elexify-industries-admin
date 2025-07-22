import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import FilterOptions from 'app/core/models/FilterOptions';
import { InventoryService } from 'app/core/services/inventory.service';
import * as Global from 'app/global';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { PickedItemComponent } from './picked-item/picked-item.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-pick-order',
  imports: [
    CurrencyPipe,
    NgFor,
    NgIf,
    DatePipe,
    NgxBarcode6Module,
    ReactiveFormsModule,
  ],
  templateUrl: './pick-order.component.html',
  styleUrl: './pick-order.component.scss',
})
export class PickOrderComponent {
  Global = Global;
  filterOption: FilterOptions;
  formGroup!: FormGroup;
  data: any = null;
  @ViewChild('skuInput') skuInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.filterOption = Global.resetTableFilterOptions();
  }
  ngAfterViewInit(): void {
    // Automatically focus the input when view is ready
    this.skuInput.nativeElement.focus();
  }
  ngOnInit() {
    this.formGroup = this.fb.group({
      sku: [null, Validators.required],
    });
    this.formGroup
      .get('sku')
      ?.valueChanges.pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        distinctUntilChanged(), // Only emit when value changes
        filter((value) => !!value?.trim()) // Skip empty values if needed
      )
      .subscribe((value: string) => {
        console.log('Debounced SKU:', value);
        let params = new URLSearchParams({
          sku: value,
          order_id: this.data?._id,
        });

        this.inventoryService.scanAndPackItem(params).subscribe({
          next: (res: any) => {
            console.log(res);
            this.fetchOrderList();
          },
          error: (err) => {},
        });
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
      },
      error: (err) => {},
    });
  }
  pickedItem() {
    this.dialog.open(PickedItemComponent, {
      data: {},
      width: '500px',
    });
  }
}
