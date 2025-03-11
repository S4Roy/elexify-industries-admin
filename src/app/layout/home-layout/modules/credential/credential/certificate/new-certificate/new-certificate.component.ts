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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as Global from '../../../../../../../global';
import { NgIf } from '@angular/common';
import { SettingsService } from '../../../../../../../core/services/settings.service';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-new-certificate',
  imports: [ NgIf,
      MatDialogModule,
      MatIconModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule],
  templateUrl: './new-certificate.component.html',
  styleUrl: './new-certificate.component.scss'
})
export class NewCertificateComponent {
  Global = Global;
  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private settingService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewCertificateComponent>
  ) {
    this.formGroup = this.fb.group({
      certificate_name: [
        this.data?.certificate_name ?? null,
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
      this.settingService.submitCredentialCertificate(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
          this.toastr.success(
            `Certificate ${!formData.id ? 'added' : 'updated'} Successfully`
          );
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
}
