import { Component } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { MenuComponent } from '../menu/menu.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-section3-landing-info-card',
  imports: [FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MenuComponent,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf],
  templateUrl: './home-section3-landing-info-card.component.html',
  styleUrl: './home-section3-landing-info-card.component.scss'
})
export class HomeSection3LandingInfoCardComponent {

  homeSec3Form: FormGroup;
  isEditMode: boolean = false; // Flag to check if we are in edit mode
  currentItemIndex: number | null = null; // To track the current item index
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private master: MasterService
  ) {
    //   Initialize the form
    this.homeSec3Form = this.fb.group({
      sec3_main_heading: [null, Validators.required],
      sec3_sub_heading: [null],
      sec3_title1: [null, Validators.required],
      sec3_des1: [null, Validators.required],
      sec3_link1: [null, Validators.required],
      sec3_title2: [null, Validators.required],
      sec3_des2: [null, Validators.required],
      sec3_link2: [null, Validators.required],
      sec3_title3: [null, Validators.required],
      sec3_des3: [null, Validators.required],
      sec3_link3: [null, Validators.required],
      file: [null],// Form control for the image
      id: [null]
    });

  }

  ngOnInit(): void {
    this.getMoreAboutAnctplData();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.homeSec3Form.patchValue({
        file: target.files[0]
      })
      this.selectedImage = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the image preview

      };
      reader.readAsDataURL(this.selectedImage);
    }
    else {
      this.homeSec3Form.patchValue({
        file: null
      })
    }
  }

  getMoreAboutAnctplData(data?: any) {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getMore_about_anctplData(params).pipe().subscribe(
      (res: any) => {
        this.homeSec3Form.patchValue({
          sec3_main_heading: res.sec3_main_heading,
          sec3_sub_heading: res.sec3_sub_heading,
          sec3_title1: res.sec3_title1,
          sec3_des1: res.sec3_des1,
          sec3_link1: res.sec3_link1,
          sec3_title2: res.sec3_title2,
          sec3_des2: res.sec3_des2,
          sec3_link2: res.sec3_link2,
          sec3_title3: res.sec3_des3,
          sec3_des3: res.sec3_des3,
          sec3_link3: res.sec3_link3,
          id: res?.setting_id
        });
        this.imagePreview = res?.homeSec3_image
      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }


  onSubmit() {

    this.homeSec3Form.markAllAsTouched();
    if (this.homeSec3Form?.valid) {
      this.homeSec3Form.disable();
      let formData = this.homeSec3Form.getRawValue();
      if (!formData.id) {
        delete formData.id
      }
      this.master.addSection_3_Data(formData).subscribe({
        next: (response) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.homeSec3Form.enable();

        },
        complete: () => {
          this.homeSec3Form.enable();
        }
      });
    }
  }
  deleteItem(item?: any) {
    this.imagePreview = null;
  }
}
