import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../../../core/services/auth.service';
import { ThumbnailComponent } from '../../../../../includes/thumbnail/thumbnail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as Global from '../../../../../../../global';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-new-faq-question',
  imports: [
    NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './new-faq-question.component.html',
  styleUrl: './new-faq-question.component.scss',
})
export class NewFaqQuestionComponent {
  Global = Global;
  faqForm!: FormGroup;
  toogleTextPassword: boolean = false;
  encodedUrl: any = null;
  options : any[] = ["Option1","Option2"];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');

    this.faqForm = this.fb.group({
      category:[null,Validators.required],
      question:[null,Validators.required],
      comment:[null,Validators.required]
    });
  }
  submitLogin() {
    console.log("save button hit...");
    // this.faqForm.markAllAsTouched();
    // if (this.faqForm.valid) {
    //   this.faqForm.disable();
    //   this.authService.adminLogin(this.faqForm.getRawValue()).subscribe({
    //     next: (res: any) => {
    //       this.authService.userSuccessLogin(res, true, this.encodedUrl);
    //     },
    //     error: (err: any) => {
    //       this.faqForm.enable();
    //     },
    //     complete: () => {
    //       this.faqForm.enable();
    //       this.toastr.success('Logged in Successfully!', 'Welcome!', {
    //         timeOut: 1000, // Display for 1 seconds
    //       });
    //     },
    //   });
    // }
  }
}
