import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpService } from '../../../../../core/services/http.service';
import { AddAwardsComponent } from '../../awards/add-awards/add-awards.component';
import * as Global from '../../../../../global';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { PageService } from '../../../../../core/services/page.service';
import moment from 'moment';
@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.scss'],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MenuComponent,
    MatRadioModule,
    NgFor,
  ],
})
export class AddTenderComponent implements OnInit {
  Global = Global;

  formGroup: FormGroup;

  data: any = null;
  category_list: any = [];
  id: any = null;
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    this.formGroup = this.fb.group({
      tender_category_id: [null, Validators.required],
      tender_name: [null, Validators.required],
      tender_no: [null, Validators.required],
      description: [null, Validators.required],
      start_at: [null, Validators.required],
      end_at: [null, Validators.required],
      corrigendum_tender: ['yes', Validators.required],
      tender_status: ['open', Validators.required],
      status: ['active', Validators.required],
      corrigendum_start_at: [null],
      corrigendum_end_at: [null],
      file: [null, Validators.required], // Form control for the image
      file_preview: [null], // Form control for the image
      file_co: [null],
      file_co_preview: [null],
    });
    if (this.id) {
      this.formGroup.get('file')?.clearValidators();
      this.formGroup.get('file')?.updateValueAndValidity();
    }
  }
  allowedTypes = [
    'application/pdf', // PDF
    'application/msword', // DOC
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'application/zip', // ZIP
  ];
  ngOnInit(): void {
    this.tenderCategoryList();
    if (this.id) {
      this.tenderDetails();
    }
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();

      if (this.data?.id) {
        formData.id = this.data.id;
        formData.is_fdel = 'n';
        formData.is_fco_del = 'n';
      }
      delete formData.file_preview;
      if (!formData?.file) {
        delete formData.file;
      }
      delete formData.file_co_preview;
      if (!formData?.file_co) {
        delete formData.file_co;
      }
      if (formData.start_at) {
        formData.start_at = moment(formData.start_at).format('YYYY-MM-DD');
      }
      if (formData.end_at) {
        formData.end_at = moment(formData.end_at).format('YYYY-MM-DD');
      }
      if (formData.corrigendum_start_at) {
        formData.corrigendum_start_at = moment(
          formData.corrigendum_start_at
        ).format('YYYY-MM-DD');
      }
      if (formData.corrigendum_end_at) {
        formData.corrigendum_end_at = moment(
          formData.corrigendum_end_at
        ).format('YYYY-MM-DD');
      }
      this.pageService.submitTender(formData).subscribe({
        next: (res: any) => {
          this.toastr.success(
            `Tender ${!formData.id ? 'added' : 'updated'} Successfully`
          );
          this.router.navigateByUrl('/tender');
          this.formGroup.enable();
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
  tenderCategoryList() {
    this.pageService.tenderCategoryList().subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.category_list = results ?? [];
        // this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  tenderDetails() {
    this.pageService.tenderDetails(this.id).subscribe({
      next: (res: any) => {
        this.data = res;
        this.formGroup.patchValue(this.data);
        this.formGroup.patchValue({
          file_preview: this.data?.attachment
            ? Global.BACKEND_URL + this.data?.attachment
            : null,
          file_co_preview: this.data?.corrigendum_attachment
            ? Global.BACKEND_URL + this.data?.corrigendum_attachment
            : null,
        });
      },
      error: (err) => {},
    });
  }
}
