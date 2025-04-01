import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SettingsService } from '../../../../../core/services/settings.service';
import { NgFor, NgIf } from '@angular/common';
import * as Global from '../../../../../global';
@Component({
  selector: 'app-add-new-user',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss',
})
export class AddNewUserComponent {
  Global = Global;
  formGroup!: FormGroup;
  toogleTextPassword: boolean = false;
  role_list: any = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private settingService: SettingsService,
    private dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      role_id: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      status: ['active', Validators.compose([Validators.required])],
    });
    this.userTypeList()
    if (this.data?.id) {
      this.userDetails();
    }
  }
  submitUser() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      if (this.data?.id) {
        delete formData.email
        formData.id = this.data.id;
      }
      if (!formData.password) {
        delete formData.password;
      }
      this.settingService.submitUser(formData).subscribe({
        next: (res: any) => {
          this.formGroup.enable();
          this.formGroup.reset();
          this.dialogRef.close(res);
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
  userTypeList() {
    let params = new URLSearchParams();
    params.set('limit', '100');
    this.settingService.userTypeList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.role_list = results ?? [];
        // this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  userDetails() {
    this.settingService.userDetails(this.data.id).subscribe({
      next: (res: any) => {
        this.formGroup.patchValue({
          name: res?.name,
          email: res?.email,
          role_id: res?.role_id,
          status: res?.status,
        });
        this.formGroup.get('password')?.clearValidators();
        this.formGroup.get('password')?.updateValueAndValidity();
      },
      error: (err) => {},
    });
  }
}
