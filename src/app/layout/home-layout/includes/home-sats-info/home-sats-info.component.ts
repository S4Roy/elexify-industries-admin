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
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-sats-info',
  imports: [FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    //MenuComponent,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf,CommonModule],
  templateUrl: './home-sats-info.component.html',
  styleUrl: './home-sats-info.component.scss'
})
export class HomeSatsInfoComponent {

  formGroup!: FormGroup;
  isSubmitted : boolean =false;

  constructor(
      private toastr: ToastrService,
      private master: MasterService,
      private fb: FormBuilder,
    ) {
      this.formGroup = this.fb.group({
        "id": [null],
        "heading_text_1": [null, Validators.required],
        "heading_text_2":[null, Validators.required],
        "description": [null, Validators.required],
        "gse_fleet_label_name": [null, Validators.required],
        "gse_fleet_label_val": [null, Validators.required],
        "tons_of_cargo_label_name":[null, Validators.required],
        "tons_of_cargo_label_val":[null, Validators.required],
        "employees_label_name":[null, Validators.required],
        "employees_label_val":[null, Validators.required],
      })
    }

    get heading_text_1(){
      return this.formGroup.get('heading_text_1')
    }

    get description() {
      return this.formGroup.get('description')
    }
    get heading_text_2() {
      return this.formGroup.get('heading_text_2')
    }
   
    ngOnInit(): void {
      this.getSatsList();
    }

    getSatsList(data?: any) {
      let params: URLSearchParams = new URLSearchParams();
      this.master.getSatsList(params).pipe().subscribe(
        (res: any) => {
          this.formGroup.patchValue({
            heading_text_1: res.heading_text_1,
            heading_text_2: res.heading_text_2,
            description: res.description,
            gse_fleet_label_name: res.list.gse_fleet.label_name,
            gse_fleet_label_val: res.list.gse_fleet.label_count,
            tons_of_cargo_label_name: res.list.tons_of_cargo.label_name,
            tons_of_cargo_label_val: res.list.tons_of_cargo.label_count,
            employees_label_name: res.list.employees.label_name,
            employees_label_val: res.list.employees.label_count,
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
  
    onSubmit() {
      this.isSubmitted = true;
      this.formGroup.markAllAsTouched();
      if (this.formGroup?.valid) {
        this.formGroup.disable();
        let formData = this.formGroup.getRawValue();
        console.log(this.formGroup)
        if (!formData.id) {
          delete formData.id
        }
        this.master.saveSatsData(formData).subscribe({
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
}
