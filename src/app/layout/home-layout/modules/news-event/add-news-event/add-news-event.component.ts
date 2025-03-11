import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpService } from '../../../../../core/services/http.service';
import { AddAwardsComponent } from '../../awards/add-awards/add-awards.component';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-add-news-event',
  templateUrl: './add-news-event.component.html',
  styleUrls: ['./add-news-event.component.css'],
  imports: [MatDialogModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MenuComponent, NgIf],
})
export class AddNewsEventComponent implements OnInit {

  addUrl: string = 'admin/news/add';
  editUrl: string = 'admin/news/edit';

  formGroup!: FormGroup;
  encodedUrl: any = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  hasError: boolean = false;
  hasVdError: boolean = false;
  hasSzError: boolean = false;
  file_type: any = '';
  serviceFileUrl: any;
  errorMessage1: string = ''; // Variable to hold error message
  errorMessage2: string = '';
  errorMessage3: string = ''
  maxLength1: number = 300;
  maxLength2: number = 300;
  isSubmitted: boolean = false; // Flag to track form submission

  constructor(
            private fb: FormBuilder,
            private toastr: ToastrService,
            private route: ActivatedRoute,
            private authService: AuthService,
            private httpService: HttpService,
            public dialogRef: MatDialogRef<AddAwardsComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) 
            {
              this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');
              this.formGroup = this.fb.group({
                title : ['', Validators.required],
                type: ['', Validators.required],
                short_description: [''],
                description: ['', Validators.required],
                website_link: [''],
                published_at : ['', Validators.required],
                status: ['', Validators.required],
                file: [''] // Form control for the image
              });
              this.data ? this.formGroup.patchValue(this.data) : null;
              this.data && this.data['news_images'][0].file_path ? this.formGroup.controls['file'].patchValue(environment.API_URL+this.data['news_images'][0].file_path) : null;
              this.serviceFileUrl = this.data && this.data['news_images'][0].file_path ? environment.API_URL+this.data['news_images'][0].file_path : '';
              // this.data && this.data.file_path ? this.formGroup.controls['file'].patchValue(environment.API_URL+this.data.file_path) : null;
              // this.serviceFileUrl = this.data && this.data.file_path ? environment.API_URL+this.data.file_path : '';
            }

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.formGroup.patchValue({
        file: target.files[0]
      })
      this.selectedImage = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // this.imagePreview = reader.result; // Set the image preview
        if (this.selectedImage?.type.startsWith('video/')) {
          this.videoPreview = reader.result; // Set the video preview
        } else if (this.selectedImage?.type.startsWith('image/')) {
          this.imagePreview = reader.result; // Set the image preview
        }
      };

      const validFormats = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'video/mp4',];
      //const validVdFormats = ['video/mp4'];
      if (!validFormats.includes(target.files[0].type)) {
        this.hasError = true;
        this.errorMessage1 = 'Only .png, .jpg, .gif, .jpeg and .mp4 formats are supported.';
        return; // Prevent further processing
      } else if (target.files[0].size < 24576) {
        this.hasSzError = true;
        this.errorMessage3 = 'Minimum size required: 1920 width x 640 height';
        return;
      }

      // If both checks pass, reset error state
      this.hasError = false;
      this.hasVdError = false;
      this.hasSzError = false;
      this.errorMessage1 = '';
      this.errorMessage2 = '';
      this.errorMessage3 = '';
      reader.readAsDataURL(this.selectedImage);
    }
    else {
      this.formGroup.patchValue({
        file: null
      })
    }
  }

  deleteItem(item?: any) {
    this.imagePreview = null;
    this.videoPreview = null;
  }

  onSubmit() {
    // this.isSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      if (this.data?.id) {
        formData.id = this.data.id;
      }
      let apiUrl = 
      this.data ? this.httpService.postFormData(this.editUrl, formData) : this.httpService.postFormData(this.addUrl, formData)
      
      apiUrl.subscribe({
        next: (response) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.dialogRef.close(response)
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.formGroup.enable();
        },
        complete: () => {
          this.formGroup.enable();
        }
      });
    }
  }
  
}
