import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-order-details',
  imports: [MatDialogModule, DatePipe, NgFor, NgIf],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close({ confirm: true });
  }

  onCancel(): void {
    this.dialogRef.close({ discard: true });
  }
  closeModal() {
    this.dialogRef.close(false);
  }
}
