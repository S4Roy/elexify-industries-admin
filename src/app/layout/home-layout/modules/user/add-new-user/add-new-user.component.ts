import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/services/auth.service';
import { ThumbnailComponent } from '../../../includes/thumbnail/thumbnail.component';


@Component({
  selector: 'app-add-new-user',
  imports: [MatDialogModule, MatIconModule,MatButtonModule,ReactiveFormsModule,ThumbnailComponent],
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss'
})
export class AddNewUserComponent {
  loginForm!: FormGroup;
  toogleTextPassword: boolean = false;
  encodedUrl: any = null;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');

    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }
  submitLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginForm.disable();
      this.authService.adminLogin(this.loginForm.getRawValue()).subscribe({
        next: (res: any) => {
          this.authService.userSuccessLogin(res, true, this.encodedUrl);
        },
        error: (err: any) => {
          this.loginForm.enable();
        },
        complete: () => {
          this.loginForm.enable();
          this.toastr.success('Logged in Successfully!', 'Welcome!', {
            timeOut: 1000, // Display for 1 seconds
          });
        },
      });
    }
  }
}
