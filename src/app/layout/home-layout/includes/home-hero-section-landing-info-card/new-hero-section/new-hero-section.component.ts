import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { ThumbnailComponent } from '../../thumbnail/thumbnail.component';
import { NgIf } from '@angular/common';
import { MasterService } from '../../../../../core/services/master.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../../menu/menu.component';


@Component({
  selector: 'app-new-hero-section',
  imports: [MatDialogModule,
    MenuComponent, MatIconModule, MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './new-hero-section.component.html',
  styleUrl: './new-hero-section.component.scss'
})
export class NewHeroSectionComponent {

  homeHeroSecForm!: FormGroup;
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
    private master: MasterService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<NewHeroSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');
    if (data?.file_type == 'image') {
      this.imagePreview = data?.hero_sec_image_video
    } else {
      this.videoPreview = data?.hero_sec_image_video
    }

    this.homeHeroSecForm = this.fb.group({
      hero_sec_main_heading: [data?.hero_sec_main_heading ?? "", [Validators.required, Validators.maxLength(this.maxLength1)]],
      hero_sec_sub_heading: [data?.hero_sec_sub_heading ?? "", [Validators.required, Validators.maxLength(this.maxLength2)]],
      file: [""] // Form control for the image
    });
  }

  get hero_sec_main_heading() {
    return this.homeHeroSecForm.get('hero_sec_main_heading');
  }
  get hero_sec_sub_heading() {
    return this.homeHeroSecForm.get('hero_sec_sub_heading');
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.homeHeroSecForm.patchValue({
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

      reader.readAsDataURL(this.selectedImage);

    }
    else {
      this.homeHeroSecForm.patchValue({
        file: null
      })
    }
  }

  deleteItem(item?: any) {
    this.imagePreview = null;
    this.videoPreview = null;
  }

  // editItem(item: any) {
  //   document.getElementById("chooseFile")?.click()
  // }

  submitHeroSecData() {
    this.isSubmitted = true;
    this.homeHeroSecForm.markAllAsTouched();
    if (this.homeHeroSecForm.valid) {
      this.homeHeroSecForm.disable();
      let formData = this.homeHeroSecForm.getRawValue();
      if (this.data?.id) {
        formData.id = this.data.id;
        formData.setting_id = this.data.setting_id;
      }
      this.master.addHeroSectionData(formData).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.dialogRef.close(response)
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.homeHeroSecForm.enable();
        },
        complete: () => {
          this.homeHeroSecForm.enable();
        }
      });
    }

  }
}
