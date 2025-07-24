import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { CommunicatorService } from 'app/core/services/communicator.service';

@Component({
  selector: 'app-pack-item',
  imports: [
    CurrencyPipe,
    NgFor,
    NgIf,
    DatePipe,
    NgxBarcode6Module,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './pack-item.component.html',
  styleUrl: './pack-item.component.scss',
})
export class PackItemComponent {
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
    private communicator: CommunicatorService
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

    this.route.parent?.paramMap.subscribe((params) => {
      this.filterOption._id = params.get('_id');
      if (this.filterOption._id) {
        this.fetchPackedItems();
      }
    });
  }
  fetchPackedItems() {
    let params = new URLSearchParams();
    params.set('_id', String(this.filterOption._id));
    this.inventoryService.packedItems(params).subscribe({
      next: (res: any) => {
        this.data = res?.data;
      },
      error: (err) => {},
    });
  }
  onEnterScan(): void {
    const value = this.formGroup.get('sku')?.value?.trim();
    if (!value) return;

    const params = new URLSearchParams({
      sku: value,
      order_id: this.data?._id,
    });

    this.inventoryService.scanAndPackItem(params).subscribe({
      next: (res: any) => {
        this.formGroup.reset();
        this.fetchPackedItems();
        // this.communicator.triggerAction({ from: 'PickItem', action: 'reload' });
      },
      error: (err) => {
        console.error(err);
        this.formGroup.reset();
      },
    });
  }
}
