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

@Component({
  selector: 'app-new-faq-question',
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
  ],
  templateUrl: './new-faq-question.component.html',
  styleUrl: './new-faq-question.component.scss',
})
export class NewFaqQuestionComponent {
  Global = Global;
  faqForm!: FormGroup;
  category_list: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogRef: MatDialogRef<NewFaqQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingService: SettingsService
  ) {
    this.fetchFaqCategoryList();
    this.faqForm = this.fb.group({
      category_id: [data?.faq_category_id ?? null, Validators.required],
      question: [data?.question ?? null, Validators.required],
      answer: [data?.answer ?? null, Validators.required],
      status: [data?.status ?? 'active', Validators.required],
    });
  }
  fetchFaqCategoryList() {
    let params = new URLSearchParams();
    params.set('limit', '100');
    this.settingService.faqCategoryList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.category_list = results ?? [];
        // this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  onSubmit() {
    this.faqForm.markAllAsTouched();
    if (this.faqForm.valid) {
      this.faqForm.disable();
      let formData = this.faqForm.getRawValue();
      if (this.data?.id) {
        formData.id = this.data.id;
      }
      this.settingService.submitFAQ(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
          this.toastr.success(
            `FAQ ${!formData.id ? 'added' : 'updated'} Successfully`
          );
        },
        error: (err: any) => {
          this.faqForm.enable();
        },
      });
    }
  }
}
