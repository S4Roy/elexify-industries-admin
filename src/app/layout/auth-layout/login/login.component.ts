import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatCheckboxModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  toogleTextPassword: boolean = false;
  encodedUrl: any = null;
  credentialerror: boolean =false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');

    this.loginForm = this.fb.group({
      email: [null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
      //rememberme: [true],
    });
  }
  submitLogin() {
    console.log(this.loginForm,"loginnnnnnnnnnnnnn");
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginForm.disable();
      console.log(this.loginForm.getRawValue());
      this.authService.adminLogin(this.loginForm.getRawValue()).subscribe({
        next: (res: any) => {
          console.log(res,"resssssss");
          this.authService.userSuccessLogin(res, true, this.encodedUrl);       
        },
        error: (err: any) => {
          console.log(err,"errrrrrrrrrr");
          this.loginForm.enable();
          this.toastr.error('Please check the email and password','', {
            timeOut: 2000,
          });
          // this.authService.userSuccessLogin({token:'gregrehberhbe',email:'email@ff.ff'}, true, this.encodedUrl);
         // this.authService.userSuccessLogin({token:this.authService.USER_TOKEN_ADMIN,email:this.loginForm.value.email}, true, this.encodedUrl);

        },
        complete: () => {
          console.log('completeeeeeeee');
          this.loginForm.enable();
          this.toastr.success('Logged in Successfully!', 'Welcome!', {
            timeOut: 1000, // Display for 1 seconds
          });
        },
      });
    }
  }

  proceedtoResetPassword() {
    // this.router.navigate(['forgot-password']);
    this.router.navigateByUrl('auth/forgot-password');
   // window.location.href = '/forgot-password';
  //  // event.preventDefault();
  //   this.router.navigateByUrl('forgetPassword');
  //  console.log(this.encodedUrl,"dhgfsdhfjhsvfhu");
  //  // this.router.navigate([this.encodedUrl ?? 'forgetPassword']);
  //   console.log("hi");
  }
}
