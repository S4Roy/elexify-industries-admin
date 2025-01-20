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
import { AuthService } from '../../../../../../core/services/auth.service';
import { ThumbnailComponent } from '../../../../includes/thumbnail/thumbnail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as Global from '../../../../../../global';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-new-user-role-permissions',
  imports: [NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatCheckboxModule, NgFor],
  templateUrl: './new-user-role-permissions.component.html',
  styleUrl: './new-user-role-permissions.component.scss'
})
export class NewUserRolePermissionsComponent {
  section_list: any = [];
  Global = Global;
  addNewRoleForm!: FormGroup;
  toogleTextPassword: boolean = false;
  encodedUrl: any = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.encodedUrl = this.route.snapshot.queryParamMap.get('redirectTo');
    this.section_list = [
      {
        id: 1,
        name: 'View',
      },
      {
        id: 2,
        name: 'Add',
      },
      {
        id: 3,
        name: 'Edit',
      },
      {
        id: 4,
        name: 'Delete',
      }
    ];

    this.addNewRoleForm = this.fb.group({
      role: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 _-]+$'),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }
  submitLogin() {
    this.addNewRoleForm.markAllAsTouched();
    if (this.addNewRoleForm.valid) {
      this.addNewRoleForm.disable();
      this.authService.adminLogin(this.addNewRoleForm.getRawValue()).subscribe({
        next: (res: any) => {
          this.authService.userSuccessLogin(res, true, this.encodedUrl);
        },
        error: (err: any) => {
          this.addNewRoleForm.enable();
        },
        complete: () => {
          this.addNewRoleForm.enable();
          this.toastr.success('Logged in Successfully!', 'Welcome!', {
            timeOut: 1000, // Display for 1 seconds
          });
        },
      });
    }
  }
}
