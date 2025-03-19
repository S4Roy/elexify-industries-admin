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
import { NgFor, NgIf } from '@angular/common';
import * as Global from '../../../../../../global';
import { SettingsService } from '../../../../../../core/services/settings.service';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { Editor, NgxEditorModule } from 'ngx-editor';
@Component({
  selector: 'app-new-blog',
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
    MatDatepickerModule,
    MenuComponent,
    NgxEditorModule,
  ],
  templateUrl: './new-blog.component.html',
  styleUrl: './new-blog.component.scss',
})
export class NewBlogComponent {
  Global = Global;
  formGroup!: FormGroup;
  toogleTextPassword: boolean = false;
  role_list: any = [];
  editor!: Editor;

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private settingService: SettingsService,
    private dialogRef: MatDialogRef<NewBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editor = new Editor();

    this.formGroup = this.fb.group({
      short_description: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      website_link: [null],
      published_at: [null, Validators.compose([Validators.required])],
      status: ['active', Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
      file_preview: [null],
    });
    if (this.data?.id) {
      this.teamMemberDetails();
      this.formGroup.get('file')?.clearValidators();
      this.formGroup.get('file')?.updateValueAndValidity();
    }
  }
  submitMember() {
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
      if (formData.published_at) {
        formData.published_at = moment(formData.published_at).format(
          'YYYY-MM-DD'
        );
      }
      this.settingService.submitBlog(formData).subscribe({
        next: (res: any) => {
          this.toastr.success(
            `Story ${this.data ? 'updated' : 'added'} Successfully`
          );
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

  teamMemberDetails() {
    this.settingService.blogDetails(this.data.id).subscribe({
      next: (res: any) => {
        this.formGroup.patchValue({
          title: res?.blog_title,
          short_description: res?.blog_short_description,
          description: res?.blog_description,
          website_link: res?.website_link,
          status: res?.status,
          published_at: res?.published_at,
          file_preview: res?.blogImages?.length
            ? Global.BACKEND_URL + res?.blogImages[0]?.file_path
            : null,
        });
        this.formGroup.get('file')?.clearValidators();
        this.formGroup.get('file')?.updateValueAndValidity();
      },
      error: (err) => {},
    });
  }
}
