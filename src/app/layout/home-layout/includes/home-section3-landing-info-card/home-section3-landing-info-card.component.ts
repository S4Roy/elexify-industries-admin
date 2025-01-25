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

@Component({
  selector: 'app-home-section3-landing-info-card',
  imports: [ThumbnailComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,],
  templateUrl: './home-section3-landing-info-card.component.html',
  styleUrl: './home-section3-landing-info-card.component.scss'
})
export class HomeSection3LandingInfoCardComponent {
  formGroup!: FormGroup;
  editor!: Editor;
  html = '';
  toastr: any;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      sec3_main_heading: [null, Validators.required],
      sec3_title1: [null, Validators.required],
      sec3_des1: [null, Validators.required],
      sec3_link1: [null, Validators.required],
      sec3_title2: [null, Validators.required],
      sec3_des2: [null, Validators.required],
      sec3_link2: [null, Validators.required],
      sec3_title3: [null, Validators.required],
      sec3_des3: [null, Validators.required],
      sec3_link3: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  save() {
    if (this.formGroup.valid) {
      // if (this.id) {
      //   this.update()
      // }
     // else {
        // this.loading = LoadingState.Processing
        // var data = Object.assign({},this.form.value)
        // if(this.company_admin){
        //   data['company'] = this.details['company']
        // }
        // this.masterService.addDepartment(data).subscribe(
        //   (res: any) => {
        //     console.log(res)
        //     this.toastr.success(res['msg'], '', {
        //       timeOut: 3000,
        //     });
        //     this.loading = LoadingState.Ready
        //     this.dialogRef.close(true)
        //   },
        //   error => {
        //     console.log(error)
        //     if (error.error) {
        //       this.toastr.error(error.error.msg, '', {
        //         timeOut: 3000,
        //       });
        //     }
        //     else {
        //       this.toastr.error('Something went wrong', '', {
        //         timeOut: 3000,
        //       });
        //     }
           // this.loading = LoadingState.Ready
      //     }
      //   )
      // }

    // } else {
    //   this.markFormGroupTouched(this.form);
     }
  }

  // update() {
  //   this.loading = LoadingState.Processing
  //   var data = Object.assign({},this.form.value)
  //   data['company'] = this.details['company']
  //   this.masterService.updateDepartment(this.id, data).subscribe(
  //     (res: any) => {
  //       console.log(res)
  //       this.toastr.success(res['msg'], '', {
  //         timeOut: 3000,
  //       });
  //       this.loading = LoadingState.Ready
  //       this.dialogRef.close(true)
  //     },
  //     error => {
  //       console.log(error)
  //       if (error.error) {
  //         this.toastr.error(error.error.msg, '', {
  //           timeOut: 3000,
  //         });
  //       }
  //       else {
  //         this.toastr.error('Something went wrong', '', {
  //           timeOut: 3000,
  //         });
  //       }
  //       this.loading = LoadingState.Ready
  //     }
  //   )
  // }
  fileUploader(ev: any, form: any, formKey: any, fileTypeExtention?: any) {
    if (ev && ev.target.files.length) {
      const fileType: any[] = fileTypeExtention;
      let file = ev.target.files[0];
      const filesExtention = file['name'].split(".").pop().toLowerCase();
      const uploadDataType = fileType.find((x: any) => x == filesExtention)
      if (uploadDataType && filesExtention.match(uploadDataType.toLowerCase())) {
        form.get(formKey)?.patchValue(file);
      } else {
        this.toastr.warning(`File Format Not Matched. ${fileType} file only alow.`)
      }
    }
  }
  getFilePreview(data: any) {
   // return this.masterService.getFilePreviewer(data);
  }
  fileConverter(data: any) {
   // return this.masterService.fileConverter(data);
  }
}
