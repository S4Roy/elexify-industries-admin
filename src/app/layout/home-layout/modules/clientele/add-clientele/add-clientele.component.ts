import { Component, Inject, OnInit } from '@angular/core';
import { NgIf, TitleCasePipe } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpService } from '../../../../../core/services/http.service';
import { MenuComponent } from '../../../includes/menu/menu.component';
import * as Global from '../../../../../global';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ApproveContentComponent } from '../../content-approvals/approve-content/approve-content.component';
@Component({
  selector: 'app-add-clientele',
  templateUrl: './add-clientele.component.html',
  styleUrls: ['./add-clientele.component.css'],
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
    TitleCasePipe
  ],
})
export class AddClienteleComponent implements OnInit {
  Global = Global;
  addUrl: string = 'admin/clientele/add';
  editUrl: string = 'admin/clientele/edit';
  editor!: Editor;

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private dialog: MatDialog,
    private authService: AuthService,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<AddClienteleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editor = new Editor();
    this.formGroup = this.fb.group({
      client_name: [null, Validators.required],
      company_name: [null, Validators.required],
      designation: [null, Validators.required],
      description: ['', Validators.required],
      client_feedback: [null],
      status: ['active', Validators.required],
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
      if (!formData?.file) {
        delete formData.file;
      }
      let apiUrl = this.data
        ? this.httpService.postFormData(this.editUrl, formData)
        : this.httpService.postFormData(this.addUrl, formData);

      apiUrl.subscribe({
        next: (response) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.dialogRef.close(response);
        },
        error: (error) => {
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
      client_name: res?.client_name ?? null,
      company_name: res?.company_name ?? null,
      description: res?.description ?? '',
      client_feedback: res?.client_feedback ?? null,
      designation: res?.designation ?? null,
      status: res?.status ?? 'active',
      file_preview: res.file_path ? Global.BACKEND_URL + res.file_path : null,
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
        if (res) {
          this.dialogRef.close(res);
        }
      });
  }
}
