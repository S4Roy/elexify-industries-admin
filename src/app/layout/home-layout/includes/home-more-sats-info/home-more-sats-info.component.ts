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
  selector: 'app-home-more-sats-info',
  imports: [

    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MenuComponent,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './home-more-sats-info.component.html',
  styleUrl: './home-more-sats-info.component.scss'
})
export class HomeMoreSatsInfoComponent {
  formGroup: FormGroup;
  selectedImage: File | null = null; // For selected image
  satsList:any = []
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private master: MasterService) {

    this.formGroup = this.fb.group({
      title: [''],
      description: [''],
      detail_link: [''],
      files: this.fb.array([]), // FormArray for files
      setting_id: [null]
    });
  }

  get files(): FormArray {
    return this.formGroup.get('files') as FormArray;
  }

  selectFiles(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      Array.from(target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          if (file?.type.startsWith('image/')) {
            this.files.push(this.newItem({ preview_path: reader.result, file: file }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
    console.log(this.formGroup);
    
  }

  newItem(item: any = null) {
    return this.fb.group({
      preview_path: [item?.preview_path ?? null],
      file: [item?.file ?? null], // Store the actual file,
      id:[item?.id ?? null]
    });
  }

  ngOnInit(): void {
    this.getMoreSatsListData();
  }

  getMoreSatsListData(data?: any) {
    let params: URLSearchParams = new URLSearchParams();
    this.files.clear()
    this.master.getMoreSatsList(params).subscribe(
      (res: any) => {
        console.log(res);
        this.satsList = res
        let id: any = res?.images.map((item: any) => item.id);
        console.log(id,"----ID");
        
        this.formGroup.patchValue({
          title: res.title,
          description: res.description,
          detail_link: res.detail_link,
          setting_id: res?.setting_id,
          id:id
        });
        if(res.images.length){
          this.filePatch(res?.images)
        }
      },
      err => {
        this.toastr.error(err.error.msg, '', { timeOut: 1000 });
      }
    );
  }
  filePatch(data:any){
    data.forEach((element:any)=>{
      this.files.push(this.newItem({ preview_path: element.file_path, file: null ,id:element.id }));
    })
    console.log(this.formGroup);
    
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.formGroup.disable(); // Disable the form to prevent multiple submissions
      const formData = new FormData();

      // Append form controls to FormData
      formData.append('title', this.formGroup.value.title);
      formData.append('description', this.formGroup.value.description);
      formData.append('detail_link', this.formGroup.value.detail_link);
      formData.append('id', this.formGroup.value.setting_id);

      // Append each file in the FormArray to FormData
      this.files.controls.forEach((control, index) => {
        const file: File = control.get('file')?.value; // Get the actual file
        if (file) {
          formData.append(`files`, file); // Append file with a unique key
        }
      });

      console.log(formData);
      
      this.master.saveMoreSatsData(formData).subscribe({
        next: (response) => {
          this.toastr.success('Data Saved Successfully!', '', { timeOut: 1000 });
          this.formGroup.enable();
        },
        error: (error) => {
          this.toastr.error('Error saving data', '', { timeOut: 1000 });
          this.formGroup.enable();
        },
        complete: () => {
          this.formGroup.enable(); // Re-enable the form after the request completes
        }
      });
    }
  }



  deleteItem(item?: any) {
    console.log(item, "itemmmm");
    const deletePayload = {
      id: item?.value.id,
      setting_id: this.satsList.setting_id,
    };

    this.master.deleteMoreSatsData(deletePayload)
      .subscribe(
        (response) => {

          console.log('Item deleted successfully!', response);
          this.getMoreSatsListData();
          this.formGroup.enable();
        },
        (error) => {

          //  console.error('Error deleting item:', error);
          this.formGroup.enable();
        }
      );
  }

}
