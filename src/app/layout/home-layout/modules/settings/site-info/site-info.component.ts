import { Component } from '@angular/core';
import { SettingsService } from '../../../../../core/services/settings.service';
import * as Global from '../../../../../global';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-site-info',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MenuComponent,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './site-info.component.html',
  styleUrl: './site-info.component.scss',
})
export class SiteInfoComponent {
  Global = Global;
  siteDetails: any = null;
  editInfo: boolean = false;
  formGroup: FormGroup;
  constructor(
    private settingService: SettingsService,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      mobile: [null],
      address: [null],
      logo: [null],
      preview_path: [null],
      embed_link: [''],
      latitude: [null],
      longitude: [null],
    });
    this.fetchSiteDetails();
  }
  fetchSiteDetails() {
    this.settingService.siteInfoDetails().subscribe({
      next: (res: any) => {
        this.siteDetails = res;
        this.formGroup.patchValue({
          name: this.siteDetails?.name,
          email: this.siteDetails?.email,
          mobile: this.siteDetails?.mobile,
          address: this.siteDetails?.address,
          embed_link: this.siteDetails?.gps_coordinates?.embed_link,
          latitude: this.siteDetails?.gps_coordinates?.latitude,
          longitude: this.siteDetails?.gps_coordinates?.longitude,
        });
      },
      error: (err: any) => {},
    });
  }
  updateData() {
    if (this.editInfo) {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid) {
        this.onSubmit();
      }
    } else {
      this.editInfo = !this.editInfo;
    }
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      delete formData.preview_path;
      if (!formData?.logo) {
        delete formData.logo;
      }
      this.settingService.updateSiteInfoDetails(formData).subscribe({
        next: (res: any) => {
          this.editInfo = !this.editInfo;
          this.fetchSiteDetails();
          this.toastr.success(`Site Info Updated Successfully`);
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
}
