import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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
import { SettingsService } from '../../../../../../core/services/settings.service';
import { HelpersService } from '../../../../../../core/services/helpers.service';

@Component({
  selector: 'app-new-user-role-permissionModule',
  imports: [
    NgIf,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgFor,
  ],
  templateUrl: './new-user-role-permissions.component.html',
  styleUrl: './new-user-role-permissions.component.scss',
})
export class NewUserRolePermissionsComponent {
  section_list: any = [];
  Global = Global;
  formGroup!: FormGroup;
  toogleTextPassword: boolean = false;
  encodedUrl: any = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private helpers: HelpersService,
    private authService: AuthService,
    private settingService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fetchPermissionList();
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
      },
    ];

    this.formGroup = this.fb.group({
      role_id: [data?.id, Validators.compose([Validators.required])],
      role_display_name: [
        data?.role_display_name,
        Validators.compose([Validators.required]),
      ],
      permissionModule: this.fb.array([]),
    });
  }
  get permissionModule(): FormArray {
    return this.formGroup.get('permissionModule') as FormArray;
  }

  fetchPermissionList() {
    let params = new URLSearchParams();
    params.set('role', String(this.data?.id));
    this.settingService.permissionList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.populatePermissions(results);
      },
      error: (err) => {},
    });
  }
  populatePermissions(results: any[]) {
    const permissionModule = this.formGroup.get(
      'permissionModule'
    ) as FormArray;
    permissionModule.clear(); // Clear existing permissions

    results.forEach((element: any) => {
      const sectionGroup = this.fb.group({
        section_name: [element.section_name],
        permissions: this.fb.array([]), // Initialize permissions as a FormArray
        sub_section_name: this.fb.array([]), // Initialize sub_section_name as a FormArray
      });

      // Handle permissions for the main section
      if (element.permissions) {
        element.permissions.forEach((permission: any) => {
          const permissionGroup = this.fb.group({
            isCheck: [permission.id ? true : false],
            id: [permission.id],
            permission_id: [permission.permission_id],
            action: [permission.action],
          });
          (sectionGroup.get('permissions') as FormArray).push(permissionGroup);
        });
      }

      // Handle sub-sections
      if (element.sub_section_name) {
        element.sub_section_name.forEach((subSection: any) => {
          const subSectionGroup = this.fb.group({
            section_name: [subSection.section_name],
            permissions: this.fb.array([]), // Initialize permissions for sub-section
          });

          // Handle permissions for the sub-section
          if (subSection.permissions) {
            subSection.permissions.forEach((permission: any) => {
              const permissionGroup = this.fb.group({
                isCheck: [permission.id ? true : false],
                id: [permission.id],
                permission_id: [permission.permission_id],
                action: [permission.action],
              });
              (subSectionGroup.get('permissions') as FormArray).push(
                permissionGroup
              );
            });
          }

          (sectionGroup.get('sub_section_name') as FormArray).push(
            subSectionGroup
          );
        });
      }

      permissionModule.push(sectionGroup);
    });

    console.log(this.formGroup.value); // Check the structure
  }

  permissions(itemIndex: number): FormArray {
    return (this.formGroup.get('permissionModule') as FormArray)
      .at(itemIndex)
      .get('permissions') as FormArray;
  }

  subSections(itemIndex: number): FormArray {
    return (this.formGroup.get('permissionModule') as FormArray)
      .at(itemIndex)
      .get('sub_section_name') as FormArray;
  }

  subSectionPermissions(itemIndex: number, subSectionIndex: number): FormArray {
    return (this.subSections(itemIndex).at(subSectionIndex) as FormGroup).get(
      'permissions'
    ) as FormArray;
  }
  onPermissionUpdate() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.formGroup.disable();
      const rawFormValue = this.formGroup.getRawValue();
      console.log(this.formGroup.valid);

      let permissions: any = [];
      rawFormValue.permissionModule.forEach((module: any) => {
        if (module?.permissions?.length) {
          module?.permissions.forEach((element: any) => {
            if (element?.isCheck) {
              permissions.push({
                id: element?.id ?? null,
                permission_id: element?.permission_id,
              });
            }
          });
        }
        if (module?.sub_section_name?.length) {
          module?.sub_section_name.forEach((subModule: any) => {
            if (subModule?.permissions?.length) {
              subModule?.permissions.forEach((subElement: any) => {
                if (subElement?.isCheck) {
                  permissions.push({
                    id: subElement?.id ?? null,
                    permission_id: subElement?.permission_id,
                  });
                }
              });
            }
          });
        }
      });
      this.settingService
        .updatePermissions({
          role_id: rawFormValue.role_id,
          permissions: permissions,
        })
        .subscribe({
          next: (res: any) => {
            this.fetchPermissionList();
            this.toastr.success(`Updated Successfully`);
            this.formGroup.enable();
          },
          error: (err: any) => {
            this.formGroup.enable();
          },
        });
    }
  }
}
