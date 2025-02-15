import { Component } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import {
  FormArray,
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
import { NgFor, NgIf } from '@angular/common';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-career-section-info-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MenuComponent,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf,

  ],
  templateUrl: './home-career-section-info-card.component.html',
  styleUrl: './home-career-section-info-card.component.scss'
})
export class HomeCareerSectionInfoCardComponent {
  formGroup!: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imagePreview2: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private master: MasterService
  ) {
    // this.imagePreview = data?.hero_sec_image_video
    this.formGroup = this.fb.group({
      title: [null, Validators.required],
      description: [""],
      file: [null],
      file_certificates: [null],
      id: [null],
      is_fdel: ['n'],
      is_fdel_cer: ['n']
    });
  }

  ngOnInit(): void {
    this.getCareerListData();
  }

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
        if (this.selectedImage?.type.startsWith('image/')) {
          this.imagePreview = reader.result; // Set the image preview
        }
      };
      reader.readAsDataURL(this.selectedImage);
    }
    else {
      this.formGroup.patchValue({
        file: null
      })
    }
  }
  onFileSelectedCertificate(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.formGroup.patchValue({
        file_certificates: target.files[0]
      })
      this.selectedImage = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // this.imagePreview = reader.result; // Set the image preview  
        if (this.selectedImage?.type.startsWith('image/')) {
          this.imagePreview2 = reader.result; // Set the image preview
        }
      };
      reader.readAsDataURL(this.selectedImage);
    }
    else {
      this.formGroup.patchValue({
        file_certificates: null
      })
    }
  }



  getCareerListData(data?: any) {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getCareerList(params).pipe().subscribe(
      (res: any) => {
        let img: any = res.file;
        // let crt:any = res?.certifcates?.map((x:any)=>{
        //   return x.file_path;
        // })
        let crt: any = Array.isArray(res?.certifcates)
          ? res.certifcates.map((x: any) => x.file_path)
          : [];
        console.log(img, crt, "test career img");

        this.formGroup.patchValue({
          title: res.title,
          description: res.description,
          file: img,
          file_certificates: crt,
          id: res?.setting_id
        });
        this.imagePreview = res?.file_path
        // this.imagePreview2 = res?.certifcates?.map((x:any)=>{
        //   return x.file_path;
        // })
        //this.imagePreview2 = res.
        // for (const certificate of res.certificates) {
        //   if (certificate?.file_path) {
        //     this.imagePreview2 =certificate.file_path;
        //   }
        // }
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
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.formGroup.disable(); // Disable the form to prevent multiple submissions
      // const formData = new FormData();

      //   formData.append('id', this.formGroup.value.id);
      //   formData.append('title', this.formGroup.value.title);
      //   formData.append('description', this.formGroup.value.description);

      //   formData.append('file',this.formGroup.value.file)
      //   formData.append('file_certificates',this.formGroup.value.file_certificates)

      let formData = this.formGroup.getRawValue();
      if (!formData.id) {
        delete formData.id
      }
      this.master.addCareer(formData).subscribe({
        next: (response) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.getCareerListData();
        },
        error: (error) => {
          this.formGroup.enable();
        },
        complete: () => {
          this.formGroup.enable(); // Re-enable the form after the request completes
        }
      });
    }
  }

  deleteItem(item?: any) {
    this.imagePreview = null;
    this.formGroup.patchValue({
      is_fdel: 'y'
    })
    this.onSubmit();

  }

  deleteItem2(item?: any) {
    this.imagePreview2 = null;
    this.formGroup.patchValue({
      is_fdel_cer: 'y'
    })
    this.onSubmit();
  }

}
