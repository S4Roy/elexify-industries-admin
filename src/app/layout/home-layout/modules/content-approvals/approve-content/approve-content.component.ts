import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MasterService } from 'app/core/services/master.service';
import * as Global from 'app/global';
@Component({
  selector: 'app-approve-content',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './approve-content.component.html',
  styleUrl: './approve-content.component.scss',
})
export class ApproveContentComponent {
  Global = Global;
  formGroup: FormGroup;
  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApproveContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.fb.group({
      id: [data?.id],
      temp_id: [data?.temp_id],
      comment: [
        null,
        data?.content_status === 'rejected'
          ? Validators.required
          : Validators.nullValidator,
      ],
      content_status: [data?.content_status, Validators.required],
    });
    console.log(this.formGroup.value);
  }
  closeModal() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.masterService
        .contentApprovalChangeRequestStatus(this.formGroup.getRawValue())
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.dialogRef.close(res);
            }
          },
        });
    }
  }
}
