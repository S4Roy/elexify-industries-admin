import { Component, Inject } from '@angular/core';
import * as Global from '../../../../../../global';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../../../core/services/settings.service';
import { NewFaqCategoryComponent } from '../../faqs/faqs-category/new-faq-category/new-faq-category.component';

@Component({
  selector: 'app-new-contact-purpose',
  imports: [
    NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './new-contact-purpose.component.html',
  styleUrl: './new-contact-purpose.component.scss',
})
export class NewContactPurposeComponent {
  Global = Global;
  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private settingService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewFaqCategoryComponent>
  ) {
    this.formGroup = this.fb.group({
      name: [
        this.data?.name ?? null,
        Validators.compose([Validators.required]),
      ],
      status: [
        this.data?.status ?? 'active',
        Validators.compose([Validators.required]),
      ],
    });
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      if (this.data?.id) {
        formData.id = this.data.id;
      }
      this.settingService.submitContactPurpose(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
          this.toastr.success(
            `Purpose ${!formData.id ? 'added' : 'updated'} Successfully`
          );
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
}
