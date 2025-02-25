import { Component } from '@angular/core';
import { InfoCardComponent } from '../../../includes/info-card/info-card.component';
import { AboutRoadmapInfoCardComponent } from '../../../includes/about-roadmap-info-card/about-roadmap-info-card.component';
import { TaggedSectionComponent } from '../../../includes/tagged-section/tagged-section.component';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PartnersComponent } from '../../../includes/master/partners/partners.component';
import { PageService } from '../../../../../core/services/page.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as Global from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-about',
  imports: [
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MenuComponent,
    NgSelectModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  Global = Global;
  pageData: any = null;
  bannerForm: FormGroup;
  aboutTextForm: FormGroup;
  constructor(
    private pageService: PageService,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) {
    this.bannerForm = this.fb.group({
      id: [null, Validators.required],
      display_text: [null, Validators.required],
      file: [null],
      file_preview: [null],
    });
    this.aboutTextForm = this.fb.group({
      id: [null, Validators.required],
      title: [null, Validators.required],
      heading_txt: [null, Validators.required],
      sub_heading_txt: [null, Validators.required],
      content: [null, Validators.required],
      is_fdel: [false],
      file: [null],
      file_preview: [null],
    });
    this.fetchAboutPage();
  }
  fetchAboutPage() {
    this.pageService.fetchAboutPage().subscribe({
      next: (res: any) => {
        this.pageData = res;
        this.bannerForm.patchValue({
          id: this.pageData?.banner?.id ?? null,
          display_text: this.pageData?.banner?.display_text ?? null,
          file_preview: this.pageData?.banner?.file_path
            ? Global.API_URL+'/' + this.pageData?.banner?.file_path
            : null,
        });
        this.aboutTextForm.patchValue({
          id: this.pageData?.about_text?.id ?? null,
          title: this.pageData?.about_text?.title ?? null,
          heading_txt: this.pageData?.about_text?.heading_txt ?? null,
          sub_heading_txt: this.pageData?.about_text?.sub_heading_txt ?? null,
          content: this.pageData?.about_text?.content ?? null,
          file_preview: this.pageData?.about_text?.file_path
            ? Global.API_URL+'/' + this.pageData?.about_text?.file_path
            : null,
        });
      },
    });
  }
  onBannerSubmit() {
    this.bannerForm.markAllAsTouched();
    if (this.bannerForm.valid) {
      this.bannerForm.disable();
      let formData = this.bannerForm.getRawValue();
      delete formData.file_preview;
      if (!formData?.file) {
        delete formData.file;
      }
      this.pageService.saveAboutUsBanner(formData).subscribe({
        next: (res: any) => {
          this.fetchAboutPage();
          this.toastr.success(`Banner Updated Successfully`);
        },
        error: (err: any) => {
          this.bannerForm.enable();
        },
      });
    }
  } 
  onTextSubmit() {
    this.aboutTextForm.markAllAsTouched();
    if (this.aboutTextForm.valid) {
      this.aboutTextForm.disable();
      let formData = this.aboutTextForm.getRawValue();
      delete formData.file_preview;
      if (!formData?.file) {
        delete formData.file;
      }
      this.pageService.saveAboutUsText(formData).subscribe({
        next: (res: any) => {
          this.fetchAboutPage();
          this.toastr.success(`Updated Successfully`);
        },
        error: (err: any) => {
          this.bannerForm.enable();
        },
      });
    }
  }
}
