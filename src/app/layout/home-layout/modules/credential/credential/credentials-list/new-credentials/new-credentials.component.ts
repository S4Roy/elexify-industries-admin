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
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SettingsService } from '../../../../../../../core/services/settings.service';
import { MenuComponent } from '../../../../../includes/menu/menu.component';

@Component({
  selector: 'app-new-credentials',
  imports: [
    NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    MenuComponent
  ],
  templateUrl: './new-credentials.component.html',
  styleUrl: './new-credentials.component.scss',
})
export class NewCredentialsComponent {
  Global = Global;
  formGroup!: FormGroup;
  category_list: any[] = [];
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogRef: MatDialogRef<NewCredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingService: SettingsService
  ) {
    this.fetchFaqCategoryList();
    this.formGroup = this.fb.group({
      category_id: [data?.credential_category_id ?? null, Validators.required],
      title: [data?.title ?? null, Validators.required],
      file: [null, Validators.required],
      file_preview: [null],
      status: [data?.status ?? 'active', Validators.required],
    });
    if (data) {
      this.formGroup.get('file')?.clearValidators();
      this.formGroup.get('file')?.updateValueAndValidity();
    }
  }
  fetchFaqCategoryList() {
    let params = new URLSearchParams();
    params.set('limit', '100');
    this.settingService.credentialsCategoryList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.category_list = results ?? [];
        // this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      delete formData.file_preview;
      if (this.data?.id) {
        formData.id = this.data.id;
      }
      if (!formData?.file) {
        delete formData.file;
      }
      this.settingService.submitCredential(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
          this.toastr.success(
            `Credentials ${!formData.id ? 'added' : 'updated'} Successfully`
          );
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
}
