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
  toogleTextPassword: boolean = false;
  encodedUrl: any = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  hasError: boolean = false;
  file_type: any = '';

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
      hero_sec_main_heading: [data?.hero_sec_main_heading ?? "",[Validators.required]],
      hero_sec_sub_heading: [data?.hero_sec_sub_heading ?? "",[Validators.required]],
      file: [""] // Form control for the image
    });
  }

  onFileSelected(event: Event) {
   // console.log(event, "eventttttt")
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
      // Validation
      //if (target.files[0].width < 1920 || target.files[0].height < 640) {
      if (target.files[0].size < 24576) {
        this.hasError = true; // Flag validation error
        return; // Prevent preview if invalid
      }

      // reader.readAsDataURL(file);
      this.hasError = false; // Reset error flag if valid
      reader.readAsDataURL(this.selectedImage);
     // this.confirmUpload();
    }
    else {
      this.homeHeroSecForm.patchValue({
        file: null
      })
    }

  }
  cancelImage() {
    // Implement your cancel image logic here
  //  console.log('Cancel Image Clicked!');
  }

  // confirmUpload() {
  //   const confirmation = confirm('Are you sure you want to upload this image?');
  //   if (!confirmation) {
  //     this.selectedImage = null; // Reset if not confirmed
  //     this.imagePreview = null; // Reset preview
  //     this.homeHeroSecForm.reset(); // Reset the form
  //   }
  // }
  submitHeroSecData() {

    // Mark all form controls as touched
    this.homeHeroSecForm.markAllAsTouched();

    // Check if the form is valid
    if (this.homeHeroSecForm.valid) {
      this.homeHeroSecForm.disable(); // Disable the form to prevent multiple submissions
      let formData = this.homeHeroSecForm.getRawValue();
      if (this.data?.id) {
        formData.id = this.data.id;
        formData.setting_id = this.data.setting_id;
      }
      // Call the service to send the FormData to the backend
      this.master.addHeroSectionData(formData).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.dialogRef.close(response)
          // Handle success response
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.homeHeroSecForm.enable();
          // Handle error response
        },
        complete: () => {
          this.homeHeroSecForm.enable(); // Re-enable the form after the request completes
        }
      });
    }

  }


  deleteItem(item?: any) {
    this.imagePreview = null;
    this.videoPreview = null;
  }
  // editItem(item: any) {
  //   document.getElementById("chooseFile")?.click()

  // }
}
