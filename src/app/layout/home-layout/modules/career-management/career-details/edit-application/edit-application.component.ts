import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Global from '../../../../../../global';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { PageService } from '../../../../../../core/services/page.service';
@Component({
  selector: 'app-edit-application',
  imports: [
    NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSelectModule,
    NgFor,
  ],
  templateUrl: './edit-application.component.html',
  styleUrl: './edit-application.component.scss',
})
export class EditApplicationComponent {
  Global = Global;
  formGroup!: FormGroup;
  statusList: any = [];
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private pageService: PageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditApplicationComponent>
  ) {
    this.formGroup = this.fb.group({
      id: [this.data?.id ?? null, Validators.compose([Validators.required])],
      job_id: [
        this.data?.job_id ?? null,
        Validators.compose([Validators.required]),
      ],
      remarks: [this.data?.remarks ?? null, Validators.compose([])],
      applicant_status: [
        this.data?.applicant_status ?? null,
        Validators.compose([Validators.required]),
      ],
    });
  }
  ngOnInit(): void {
    this.jobApplicationStatusList();
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      this.pageService.careerApplicationEdit(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
          this.toastr.success(`Updated Successfully`);
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
  jobApplicationStatusList() {
    this.pageService.jobApplicationStatusList().subscribe({
      next: (res: any) => {
        this.statusList = res?.results ?? [];
      },
      error: (err: any) => {},
    });
  }
}
