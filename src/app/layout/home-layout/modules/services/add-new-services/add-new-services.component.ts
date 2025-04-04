import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpService } from '../../../../../core/services/http.service';
import { NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../../includes/menu/menu.component';
import * as Global from 'app/global';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ApproveContentComponent } from '../../content-approvals/approve-content/approve-content.component';

@Component({
  selector: 'app-add-new-services',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MenuComponent,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxEditorModule,
    TitleCasePipe,
  ],
  templateUrl: './add-new-services.component.html',
  styleUrl: './add-new-services.component.scss',
})
export class AddNewServicesComponent {
  Global = Global;
  addUrl: string = 'admin/service/add';
  editUrl: string = 'admin/service/edit';
  editor!: Editor;
  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<AddNewServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.editor = new Editor();
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      description: ['', Validators.required],
      caption_text: [null],
      status: [null, Validators.required],
      file: [null, Validators.required], // Form control for the image
      file_preview: [null], // Form control for the image
    });
    if (this.data?.id) {
      this.patchValue(this.data);
    }
    if (this.data?.temp_id) {
      this.patchValue(this.data);
      this.formGroup.disable();
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    // this.isSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();

      if (this.data?.id) {
        formData.id = this.data.id;
      }
      delete formData.file_preview;
      if (!formData.file) {
        delete formData.file;
      }
      let apiUrl = this.data
        ? this.httpService.postFormData(this.editUrl, formData)
        : this.httpService.postFormData(this.addUrl, formData);

      apiUrl.subscribe({
        next: (response) => {
          this.toastr.success(response?.message);
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.toastr.error(error?.message);
          console.error('Upload failed', error);
          this.formGroup.enable();
        },
        complete: () => {
          this.formGroup.enable();
        },
      });
    }
  }
  patchValue(res: any) {
    this.formGroup.patchValue({
      name: res?.name ?? null,
      description: res?.description ?? '',
      caption_text: res?.caption_text ?? null,
      status: res ?? 'active',
      file_preview: res?.file_path ? Global.BACKEND_URL + res?.file_path : null,
    });
    this.formGroup.get('file')?.clearValidators();
    this.formGroup.get('file')?.updateValueAndValidity();
  }
  approveContent(content_status: string) {
    this.dialog
      .open(ApproveContentComponent, {
        data: { content_status, ...this.data?.request_details },
        width: '500px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);

        if (res) {
          this.dialogRef.close(res);
        }
      });
  }
}
