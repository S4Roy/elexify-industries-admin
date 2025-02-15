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
  selector: 'app-home-section2-landing-info-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
   // MenuComponent,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf
  ],
  templateUrl: './home-section2-landing-info-card.component.html',
  styleUrl: './home-section2-landing-info-card.component.scss'
})

export class HomeSection2LandingInfoCardComponent {

  homeSec2Form: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  maxLength: number = 40; // Set your maximum character limit here
  maxLength2: number = 40;
  maxLength3: number = 75;
  isSubmitted:boolean= false;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private master: MasterService
  ) {
    // this.imagePreview = data?.hero_sec_image_video
    this.homeSec2Form = this.fb.group({
      homeSec2_main_heading: ['',[Validators.required,Validators.maxLength(this.maxLength)]],
      homeSec2_sub_heading: ['',[Validators.required,Validators.maxLength(this.maxLength2)]],
      homeSec2_description: ['',[Validators.required,Validators.maxLength(this.maxLength)]],
      file: [null],
      id: [null],
      is_fdel:['n']
    });
  }
  get homeSec2_main_heading() {
    return this.homeSec2Form.get('homeSec2_main_heading');
  }

  get homeSec2_sub_heading() {
    return this.homeSec2Form.get('homeSec2_sub_heading');
  }

  get homeSec2_description() {
    return this.homeSec2Form.get('homeSec2_description');
  }

  ngOnInit(): void {
    this.getAboutAnctplData();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {

      this.homeSec2Form.patchValue({
        file: target.files[0]
      })
      this.selectedImage = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // this.imagePreview = reader.result; // Set the image preview  
        if (this.selectedImage?.type.startsWith('image/')) {
          this.imagePreview = reader.result; // Set the image preview
        }
      };
      reader.readAsDataURL(this.selectedImage);
     
    }
    else {
      this.homeSec2Form.patchValue({
        file: null
      })
    }
  }

  getAboutAnctplData(data?: any) {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getAbout_anctplData(params).pipe().subscribe(
      (res: any) => {
        this.homeSec2Form.patchValue({
          homeSec2_main_heading: res.homeSec2_main_heading,
          homeSec2_sub_heading: res.homeSec2_sub_heading,
          homeSec2_description: res.homeSec2_description,
          id: res?.setting_id,
          
        });
        this.imagePreview = res?.homeSec2_image
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
    this.isSubmitted = false;
    this.homeSec2Form.markAllAsTouched();
    
    if (this.homeSec2Form.valid) {
      this.homeSec2Form.disable(); // Disable the form to prevent multiple submissions
      let formData = this.homeSec2Form.getRawValue();
      if (!formData.id) {
        delete formData.id
      }
      this.master.addSection_2_Data(formData).subscribe({
        next: (response) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });  
        },
        error: (error) => {   
          this.homeSec2Form.enable();
        },
        complete: () => {
          this.homeSec2Form.enable(); // Re-enable the form after the request completes
        }
      });
    }
  }
  
  deleteItem(item?: any) {
   this.imagePreview = null;
    this.homeSec2Form.patchValue({
      is_fdel:'y' 
    })
    this.onSubmit();
  }

}
