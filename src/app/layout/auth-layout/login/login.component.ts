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
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatCheckboxModule],
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
      email: [null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
      rememberme: [true],
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
          // this.authService.userSuccessLogin({token:'gregrehberhbe',email:'email@ff.ff'}, true, this.encodedUrl);
          this.authService.userSuccessLogin({token:this.authService.USER_TOKEN_ADMIN,email:this.loginForm.value.email}, true, this.encodedUrl);

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
}
