import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DialogService } from '../../../../core/services/dialog.service';
import { ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() transferAccount: any = null;
  @Input() localConveyance: any = null;
  @Input() cancelSpecificUser: any = null;
  @Input() bikeCarLog: any = null;
  @Input() modalItem: any = null;
  @Input() reports: any = null;
  @Input() rescheduleJourney: any = null;
  @Input() cancelJourney: any = null;
  @Input() updateJourneyNumber: any = null;
  @Input() edit: any = null;
  @Input() delete: any = null;
  @Input() itineraryCancel: any = null;
  @Input() cancel: any = null;
  @Input() details: any = null;
       @Output() deleteItem = new EventEmitter<any>();
  @Output() cancelItem = new EventEmitter<any>();
  @Output() initModal = new EventEmitter<any>();
  @Output() initTransferAccountModal = new EventEmitter<any>();
  @Output() itineraryCancelModal = new EventEmitter<any>();
  @Output() updateJourneyNumberModal = new EventEmitter<any>();
  @Output() rescheduleJourneyModal = new EventEmitter<any>();
  @Output() cancelJourneyModal = new EventEmitter<any>();
  @Output() cancelSpecificUserModal = new EventEmitter<any>();
  constructor(private dialogService: DialogService) {
  }
  onDelete() {
    const dialogData: ConfirmDialogData = {
      title: 'Are you sure?',
      message: "You won't be able to revert this!",
      cancelText: 'Cancel',
      saveText: 'Delete',
    };
    this.dialogService.confirmDialog(dialogData).subscribe((result: any) => {
      if (result?.confirm) {
        this.deleteItem.next(this.delete);
      }
    });
  }
  onCancel() {
    const dialogData: ConfirmDialogData = {
      title: 'Are you sure?',
      message: "You won't be able to revert this!",
      cancelText: 'NO',
      saveText: 'YES, CANCEL',
    };
    this.dialogService.confirmDialog(dialogData).subscribe((result: any) => {
      if (result?.confirm) {
        this.cancelItem.next(this.cancel);
      }
    });
  }
}
