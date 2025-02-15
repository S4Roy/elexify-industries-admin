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
  selector: 'app-home-more-sats-info',
  imports: [FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MenuComponent,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf],
  templateUrl: './home-more-sats-info.component.html',
  styleUrl: './home-more-sats-info.component.scss'
})
export class HomeMoreSatsInfoComponent {
  formGroup!: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
      private toastr: ToastrService,
      private master: MasterService,
      private fb: FormBuilder,
    ) {
      this.formGroup = this.fb.group({
        "id": [null],
        "title": [null, Validators.required],
        "description":[null, Validators.required],
        "detail_link": [null, Validators.required],
        "file":[null]
      })
    }
   
    ngOnInit(): void {
      this.getMoreSatsList();
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

    getMoreSatsList(data?: any) {
      let params: URLSearchParams = new URLSearchParams();
      this.master.getMoreSatsList(params).pipe().subscribe(
        (res: any) => {
         
          this.formGroup.patchValue({
            title: res.heading_text_1,
            description: res.heading_text_2,
            detail_link: res.description,
            
            id: res?.setting_id
          });
         // this.imagePreview = res?.homeSec3_image
        },
        err => {
          this.toastr.error(err.error.msg, '', {
            timeOut: 1000,
          });
          // this.loading = LoadingState.Ready;
        }
      );
    }

    onSubmit(){
      this.formGroup.markAllAsTouched();
      if (this.formGroup?.valid) {
        this.formGroup.disable();
        let formData = this.formGroup.getRawValue();
        console.log(formData)
        if (!formData.id) {
          delete formData.id
        }
        this.master.saveMoreSatsData(formData).subscribe({
          next: (response) => {
            this.toastr.success('Data Saved Successfully!', '', {
              timeOut: 1000, // Display for 1 seconds
            });
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

    deleteItem(item:any){
      this.imagePreview = null;
    }
}
