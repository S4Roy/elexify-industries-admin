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
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpService } from '../../../../../core/services/http.service';
import { AddAwardsComponent } from '../../awards/add-awards/add-awards.component';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { environment } from '../../../../../../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as Global from '../../../../../global';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { MasterService } from '../../../../../core/services/master.service';
@Component({
  selector: 'app-add-news-event',
  templateUrl: './add-news-event.component.html',
  styleUrls: ['./add-news-event.component.css'],
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
    MatDatepickerModule,
    NgxEditorModule,
    NgFor
  ],
})
export class AddNewsEventComponent implements OnInit {
  Global = Global;
  addUrl: string = 'admin/news/add';
  editUrl: string = 'admin/news/edit';
  announcementType: string = 'admin/announcement-type';
  editor!: Editor;

  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<AddAwardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editor = new Editor();

    this.formGroup = this.fb.group({
      title: [null, Validators.required],
      type: [null, Validators.required],
      short_description: [null,Validators.required],
      description: ['', Validators.required],
      website_link: [null],
      published_at: [null, Validators.required],
      status: [null, Validators.required],
      file: [null, Validators.required], // Form control for the image
      file_preview: [null], // Form control for the image
    });
    if (data) {
      this.formGroup.patchValue({
        title: this.data?.title ?? null,
        type: this.data?.type ?? null,
        short_description: this.data?.short_description ?? null,
        description: this.data?.description ?? null,
        website_link: this.data?.website_link ?? null,
        published_at: this.data?.published_at ?? null,
        status: this.data?.status ?? 'active',
        file_preview: this.data?.news_images?.length
          ? Global.BACKEND_URL + this.data?.news_images[0]?.file_path
          : null,
      });
      this.formGroup.get('file')?.clearValidators();
      this.formGroup.get('file')?.updateValueAndValidity();
    }
    if (data?.action=='view') {
      this.formGroup.disable()
    }
  }
  type_list: any = [];
  ngOnInit(): void {
    this.fetchAnnouncementType();
  }
  fetchAnnouncementType() {
    this.masterService.announcementType().subscribe((res: any) => {
      this.type_list = res?.results;
    });
  }
  onSubmit() {
    // this.isSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      formData.published_at = moment(formData.published_at).format(
        'YYYY-MM-DD'
      );
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
