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

@Component({
  selector: 'app-home-section2-landing-info-card',
  imports: [ThumbnailComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MatIcon,MatMenu,
    MatMenuModule, MatButtonModule, MatIconModule, RouterModule
    ],
  templateUrl: './home-section2-landing-info-card.component.html',
  styleUrl: './home-section2-landing-info-card.component.scss'
})
export class HomeSection2LandingInfoCardComponent {
  formGroup!: FormGroup;
  editor!: Editor;
  html = '';

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      main_heading: [null, Validators.required],
      sub_heading: [null, Validators.required],
      description: [null, Validators.required]
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

}
