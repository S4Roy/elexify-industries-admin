import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule,Router,ActivatedRoute } from '@angular/router';
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
    
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginForm.disable();
      
      this.authService.adminLogin(this.loginForm.getRawValue()).subscribe({
        next: (res: any) => {
         
          this.authService.userSuccessLogin(res, true, this.encodedUrl);       
        },
        error: (err: any) => {
      
          this.loginForm.enable();
          // this.toastr.error('Please check the email and password','', {
          //   timeOut: 2000,
          // });
          // this.authService.userSuccessLogin({token:'gregrehberhbe',email:'email@ff.ff'}, true, this.encodedUrl);
         

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

  // proceedtoResetPassword() {
  //   // this.router.navigate(['forgot-password']);
  //   this.router.navigateByUrl('/auth/forgot-password');
  // }
}
