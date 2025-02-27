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
import { SettingsService } from '../../../../../core/services/settings.service';
import * as Global from '../../../../../global';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { PageService } from '../../../../../core/services/page.service';
@Component({
  selector: 'app-add-gallery',
  imports: [
    NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MenuComponent
  ],
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.css'],
})
export class AddGalleryComponent implements OnInit {
  Global = Global;
  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private pageService: PageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddGalleryComponent>
  ) {
    this.formGroup = this.fb.group({
      title: [
        this.data?.title ?? null,
        Validators.compose([Validators.required]),
      ],
      status: [
        this.data?.status ?? 'active',
        Validators.compose([Validators.required]),
      ],
      file: [null],
      file_preview: [this.data?.file_path?(Global.BACKEND_URL +this.data?.file_path):null],
    });
  }
  ngOnInit(): void {}
  onSubmit() {
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
      this.pageService.addMedia(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
          this.toastr.success(
            `Media ${!formData.id ? 'added' : 'updated'} Successfully`
          );
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
}
