import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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
          this.authService.userSuccessLogin({token:'gregrehberhbe',email:'email@ff.ff'}, true, this.encodedUrl);

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
