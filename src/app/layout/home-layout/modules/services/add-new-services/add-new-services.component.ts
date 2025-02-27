import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { ThumbnailComponent } from '../../../includes/thumbnail/thumbnail.component';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgIf } from '@angular/common';
import { MasterServiceManagementService } from '../../../../../core/services/master-service-management.service';
import { environment } from '../../../../../../environments/environment';



@Component({
  selector: 'app-add-new-services',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MenuComponent, NgIf],
  templateUrl: './add-new-services.component.html',
  styleUrl: './add-new-services.component.scss'
})
export class AddNewServicesComponent {
  formGroup!: FormGroup;
  encodedUrl: any = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  hasError: boolean = false;
  hasVdError: boolean = false;
  hasSzError: boolean = false;
  file_type: any = '';
  deleteFileFlag: any;
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
    private masterServiceManagement: MasterServiceManagementService,
    public dialogRef: MatDialogRef<AddNewServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
   // this.formGroup.patchValue(this.data);
   
    this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');
    this.formGroup = this.fb.group({
      name: [""],
      description: [""],
      caption_text: [""],
      status: [""],
      file: [""] // Form control for the image
      // hero_sec_main_heading: [data?.hero_sec_main_heading ?? "", [Validators.required, Validators.maxLength(this.maxLength1)]],
      // hero_sec_sub_heading: [data?.hero_sec_sub_heading ?? "", [Validators.required, Validators.maxLength(this.maxLength2)]],
      // file: [""] // Form control for the image
    });
    this.data? this.formGroup.patchValue(this.data) : null;
    this.data && this.data.file_path ? this.formGroup.controls['file'].patchValue(environment.API_URL+this.data.file_path) : null;
   
    this.serviceFileUrl = this.data && this.data.file_path ? environment.API_URL+this.data.file_path : '';
  }

  onFileSelected(event: Event) {
    console.log(event,"eventtttttttttttttt");
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
      //  else if (!validVdFormats.includes(target.files[0].type)) {
      //   this.hasVdError = true;
      //   this.errorMessage2 = 'Only .mp4 format is supported.';
      //   return; 
      // }else if (target.files[0].size < 24576) {
      //   this.hasSzError = true;
      //   this.errorMessage3 = 'Minimum size required: 1920 width x 640 height';
      //   return; 
      // }

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
      if (this.data?.id) {
        formData.id = this.data.id;
        //formData.setting_id = this.data.setting_id;
      }
      let apiUrl = 
      this.data ? this.masterServiceManagement.editServiceManagement(formData)
        :
        this.masterServiceManagement.addServiceManagement(formData)
      
      // this.masterServiceManagement.addServiceManagement(formData)
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
