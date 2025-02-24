import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../../../core/services/auth.service';
import { ThumbnailComponent } from '../../../../../includes/thumbnail/thumbnail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as Global from '../../../../../../../global';
import { NgIf } from '@angular/common';
import { SettingsService } from '../../../../../../../core/services/settings.service';
@Component({
  selector: 'app-new-faq-category',
  imports: [
    NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './new-faq-category.component.html',
  styleUrl: './new-faq-category.component.scss',
})
export class NewFaqCategoryComponent {
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
      category_name: [
        this.data?.category_name ?? null,
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
      this.settingService.submitFaqCategory(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
          this.toastr.success(
            `Category ${!formData.id ? 'added' : 'updated'} Successfully`
          );
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
}
