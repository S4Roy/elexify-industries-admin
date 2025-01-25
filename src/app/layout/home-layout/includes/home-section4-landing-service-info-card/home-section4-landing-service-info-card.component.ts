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

import { MatIconModule } from '@angular/material/icon';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-section4-landing-service-info-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,MatIconModule],
  templateUrl: './home-section4-landing-service-info-card.component.html',
  styleUrl: './home-section4-landing-service-info-card.component.scss'
})
export class HomeSection4LandingServiceInfoCardComponent {
  formGroup!: FormGroup;
  editor!: Editor;
  html = '';
  addItem(data: any = null) {
      // this.dialog
      //   .open(NewPartnerComponent, {
      //     data: data,
      //     disableClose: true,
      //   })
      //   .afterClosed()
      //   .subscribe((res: any) => {
      //     console.log(res);
      //   });
  }

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      mainHeading: [null, Validators.required],
      serviceHeading: [null, Validators.required],
      serviceDescription: [null, Validators.required]
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
