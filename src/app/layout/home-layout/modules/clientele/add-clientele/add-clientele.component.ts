import { Component, Inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
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
    NgxEditorModule
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
    private route: ActivatedRoute,
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
    if (data) {
      this.formGroup.patchValue({
        client_name: this.data?.client_name ?? null,
        company_name: this.data?.company_name ?? null,
        description: this.data?.description ?? '',
        client_feedback: this.data?.client_feedback ?? null,
        designation: this.data?.designation ?? null,
        status: this.data?.status ?? 'active',
        file_preview: this.data.file_path
          ? Global.BACKEND_URL + this.data.file_path
          : null,
      });
      this.formGroup.get('file')?.clearValidators();
      this.formGroup.get('file')?.updateValueAndValidity();
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
}
