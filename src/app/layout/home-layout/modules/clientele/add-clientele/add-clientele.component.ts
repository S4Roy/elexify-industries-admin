import { Component, Inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpService } from '../../../../../core/services/http.service';
import { AddAwardsComponent } from '../../awards/add-awards/add-awards.component';
import { MenuComponent } from '../../../includes/menu/menu.component';

@Component({
  selector: 'app-add-clientele',
  templateUrl: './add-clientele.component.html',
  styleUrls: ['./add-clientele.component.css'],
  imports: [MatDialogModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MenuComponent, NgIf],
})
export class AddClienteleComponent implements OnInit {

  addUrl: string = 'admin/clientele/add';
  editUrl: string = 'admin/clientele/edit';

  formGroup!: FormGroup;
  encodedUrl: any = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  hasError: boolean = false;
  hasVdError: boolean = false;
  hasSzError: boolean = false;
  file_type: any = '';
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
            public dialogRef: MatDialogRef<AddClienteleComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) 
            {
              console.log(this.data);
              this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');
              this.formGroup = this.fb.group({
                client_name  : ['', Validators.required],
                company_name : ['', Validators.required],
                designation : ['', Validators.required],
                description: ['', Validators.required],
                client_feedback: [''],
                status: ['', Validators.required],
                file: [''] // Form control for the image
              });
              this.data ? this.formGroup.patchValue(this.data) : null;
            }

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    console.log(event);
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

      console.log(target.files[0].type, "sizeee");
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
      console.log(this.selectedImage)
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
      console.log(formData)
      if (this.data?.id) {
        formData.id = this.data.id;
      }
      let apiUrl = 
      this.data ? this.httpService.postFormData(this.editUrl, formData) : this.httpService.postFormData(this.addUrl, formData)
      
      apiUrl.subscribe({
        next: (response) => {
          console.log('Upload successful', response);
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
