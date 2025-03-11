import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpService } from '../../../../../core/services/http.service';
import { AddClienteleComponent } from '../../clientele/add-clientele/add-clientele.component';
import { MenuComponent } from '../../../includes/menu/menu.component';

@Component({
  selector: 'app-add-enquiry-management',
  templateUrl: './add-enquiry-management.component.html',
  styleUrls: ['./add-enquiry-management.component.css'],
  imports: [MatDialogModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
})
export class AddEnquiryManagementComponent implements OnInit {

  editUrl: string = 'admin/inquiry/edit';

  formGroup!: FormGroup;
  encodedUrl: any = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  hasError: boolean = false;
  hasVdError: boolean = false;
  hasSzError: boolean = false;
  file_type: any = '';
  errorMessage1: string = ''; // Variable to hold error message
  errorMessage2: string = '';
  errorMessage3: string = ''
  maxLength1: number = 300;
  maxLength2: number = 300;
  isSubmitted: boolean = false; // Flag to track form submission

  constructor(
            private fb: FormBuilder,
            private toastr: ToastrService,
            private route: ActivatedRoute,
            private authService: AuthService,
            private httpService: HttpService,
            public dialogRef: MatDialogRef<AddClienteleComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) 
            {
              this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');
              this.formGroup = this.fb.group({
                id: this.data.id,
                remark   : ['', Validators.required],
                has_read : ['', Validators.required],
              });
              // this.data ? this.formGroup.patchValue(this.data) : null;
            }

  ngOnInit(): void {}

  
  onSubmit() {
    
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      // let formData = this.formGroup.getRawValue();
      // if (this.data?.id) {
      //   formData.id = this.data.id;
      // }
      let apiUrl = this.httpService.post(this.editUrl, this.formGroup.value);
      
      apiUrl.subscribe({
        next: (response) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.dialogRef.close(response)
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
