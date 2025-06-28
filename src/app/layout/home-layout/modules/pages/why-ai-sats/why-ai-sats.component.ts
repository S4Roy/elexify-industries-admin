import { Component } from '@angular/core';
import { InfoCardComponent } from '../../../includes/info-card/info-card.component';
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
import { Editor, NgxEditorModule } from 'ngx-editor';
@Component({
  selector: 'app-why-ai-sats',
  imports: [
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MenuComponent,
    NgSelectModule,
    NgxEditorModule,
    NgFor,
  ],
  templateUrl: './why-ai-sats.component.html',
  styleUrl: './why-ai-sats.component.scss',
})
export class WhyAiSatsComponent {
  Global = Global;
  pageData: any = null;
  bannerForm: FormGroup;
  aboutTextForm: FormGroup;
  companyInfoForm: FormGroup;
  clientForm: FormGroup;
  reviewForm: FormGroup;
  client_list: any = [];
  partner_list: any = [];
  mainForm: FormGroup;
  aboutTextEditor!: Editor;
  editor!: Editor;
  constructor(
    private pageService: PageService,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) {
    this.aboutTextEditor = new Editor();
    this.editor = new Editor();
    this.bannerForm = this.fb.group({
      id: [null, Validators.required],
      display_text: [null, Validators.required],
      file: [null],
      file_preview: [null],
    });
    this.aboutTextForm = this.fb.group({
      id: [null, Validators.required],
      title: [null],
      heading_txt: [null, Validators.required],
      content: ['', Validators.required],
      is_fdel: ['n'],
      file: [null],
      file_preview: [null],
    });
    this.companyInfoForm = this.fb.group({
      id: [null, Validators.required],
      heading_txt: [null, Validators.required],
      sub_heading_txt: [null, Validators.required],
      rating: [0, Validators.required],
      trans_mode_data: [null, Validators.required],
      trans_mode_data_txt: [null, Validators.required],
      customer_data: [null, Validators.required],
      customer_data_txt: [null, Validators.required],
      cer_merit_data: [null, Validators.required],
      cer_merit_data_txt: [null, Validators.required],
    });
    this.mainForm = this.fb.group({
      id: [null, Validators.required],
      heading_txt: [null, Validators.required],
      sub_heading_txt: [null, Validators.required],
      content_title: [null, Validators.required],
      content_text_1: [null, Validators.required],
      content_text_2: [null, Validators.required],
      content_title_1: [null, Validators.required],
      content_countable_value: [null, Validators.required],
      content_description: [null, Validators.required],
      content_1_title: [null, Validators.required],
      content_1_text_1: [null, Validators.required],
      content_1_text_2: [null, Validators.required],
      content_1_title_1: [null, Validators.required],
      content_1_countable_value: [null, Validators.required],
      content_1_description: [null, Validators.required],
      content_2_title: [null, Validators.required],
      content_2_text_1: [null, Validators.required],
      content_2_text_2: [null, Validators.required],
      content_2_title_1: [null, Validators.required],
      content_2_countable_value: [null, Validators.required],
      content_2_description: [null, Validators.required],
    });
    this.clientForm = this.fb.group({
      id: [null, Validators.required],
      clients: [null],
    });
    this.reviewForm = this.fb.group({
      id: [null, Validators.required],
      client_review: [null],
    });

    this.fetchAboutPage();
    this.fetchClientList();
  }
  fetchAboutPage() {
    this.pageService.fetchMoreAboutPage().subscribe({
      next: (res: any) => {
        this.pageData = res;
        this.bannerForm.patchValue({
          id: this.pageData?.banner?.id ?? null,
          display_text: this.pageData?.banner?.display_text ?? null,
          file_preview: this.pageData?.banner?.file_path
            ? Global.BACKEND_URL + this.pageData?.banner?.file_path
            : null,
          is_fdel: ['n'],
        });
        this.aboutTextForm.patchValue({
          id: this.pageData?.about_text?.id ?? null,
          title: this.pageData?.about_text?.title ?? null,
          heading_txt: this.pageData?.about_text?.heading_txt ?? null,
          content: this.pageData?.about_text?.description ?? null,
          file_preview: this.pageData?.about_text?.file_path
            ? Global.BACKEND_URL + this.pageData?.about_text?.file_path
            : null,
          is_fdel: 'n',
        });
        this.companyInfoForm.patchValue({
          id: this.pageData?.company_info?.id ?? null,
          // title: this.pageData?.company_info?.title ?? null,
          heading_txt: this.pageData?.company_info?.title ?? null,
          sub_heading_txt: this.pageData?.company_info?.sub_txt_1 ?? null,
          rating: this.pageData?.company_info?.rating ?? 0,
          trans_mode_data:
            this.pageData?.company_info?.trans_mode_data?.label_count ?? null,
          trans_mode_data_txt:
            this.pageData?.company_info?.trans_mode_data?.label_name ?? null,
          customer_data:
            this.pageData?.company_info?.customer_data?.label_count ?? null,
          customer_data_txt:
            this.pageData?.company_info?.customer_data?.label_name ?? null,
          cer_merit_data:
            this.pageData?.company_info?.cer_merit_data?.label_count ?? null,
          cer_merit_data_txt:
            this.pageData?.company_info?.cer_merit_data?.label_name ?? null,
        });
        this.mainForm.patchValue({
          id: this.pageData?.main_content?.id,
          heading_txt: this.pageData?.main_content?.heading ?? null,
          sub_heading_txt: this.pageData?.main_content?.sub_heading_txt ?? null,
          content_title: this.pageData?.main_content?.list_content?.title,
          content_text_1: this.pageData?.main_content?.list_content?.text_1,
          content_text_2: this.pageData?.main_content.list_content?.text_2,
          content_title_1: this.pageData?.main_content?.list_content?.title_1,
          content_countable_value:
            this.pageData?.main_content?.list_content?.countable_value,
          content_description:
            this.pageData?.main_content?.list_content?.description,
          content_1_title: this.pageData?.main_content?.list_content_1?.title,
          content_1_text_1: this.pageData?.main_content?.list_content_1?.text_1,
          content_1_text_2: this.pageData?.main_content?.list_content_1?.text_2,
          content_1_title_1:
            this.pageData?.main_content?.list_content_1?.title_1,
          content_1_countable_value:
            this.pageData?.main_content?.list_content_1?.countable_value,
          content_1_description:
            this.pageData?.main_content?.list_content_1?.description,
          content_2_title: this.pageData?.main_content?.list_content_2?.title,
          content_2_text_1: this.pageData?.main_content?.list_content_2?.text_1,
          content_2_text_2: this.pageData?.main_content?.list_content_2?.text_2,
          content_2_title_1:
            this.pageData?.main_content?.list_content_2?.title_1,
          content_2_countable_value:
            this.pageData?.main_content?.list_content_2?.countable_value,
          content_2_description:
            this.pageData?.main_content?.list_content_2?.description,
        });
        this.clientForm.patchValue({
          id: this.pageData?.clients?.id,
          clients: this.pageData?.clients?.list ?? [],
        });
        this.reviewForm.patchValue({
          id: this.pageData?.our_reviews?.id,
          client_review: this.pageData?.our_reviews?.list ?? [],
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
      this.pageService.saveMoreAboutUsBanner(formData).subscribe({
        next: (res: any) => {
          this.bannerForm.enable();
          this.bannerForm.reset();
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
      this.pageService.saveMoreAboutUsText(formData).subscribe({
        next: (res: any) => {
          this.aboutTextForm.reset();

          this.fetchAboutPage();
          this.toastr.success(`Updated Successfully`);
          this.aboutTextForm.enable();
        },
        error: (err: any) => {
          this.aboutTextForm.enable();
        },
      });
    }
  }
  onCompanyInfoSubmit() {
    this.companyInfoForm.markAllAsTouched();
    if (this.companyInfoForm.valid) {
      this.companyInfoForm.disable();
      let formData = this.companyInfoForm.getRawValue();
      this.pageService.saveCompanyInfo(formData).subscribe({
        next: (res: any) => {
          this.companyInfoForm.reset();
          this.fetchAboutPage();
          this.companyInfoForm.enable();
          this.toastr.success(`Updated Successfully`);
        },
        error: (err: any) => {
          this.companyInfoForm.enable();
        },
      });
    }
  }

  fetchClientList() {
    // let params = new URLSearchParams();
    // params.set('limit', '100');
    this.pageService.fetchClients().subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.client_list = results ?? [];
      },
      error: (err) => {},
    });
  }
  onMainFormSubmit() {
    this.mainForm.markAllAsTouched();
    if (this.mainForm.valid) {
      this.mainForm.disable();
      let formData = this.mainForm.getRawValue();

      this.pageService.saveMainContent(formData).subscribe({
        next: (res: any) => {
          this.mainForm.reset();
          this.mainForm.enable();
          this.fetchAboutPage();
          this.toastr.success(`Updated Successfully`);
        },
        error: (err: any) => {
          this.mainForm.enable();
        },
      });
    }
  }
  onClientSubmit() {
    this.clientForm.markAllAsTouched();
    if (this.clientForm.valid) {
      this.clientForm.disable();
      let formData = this.clientForm.getRawValue();

      this.pageService.saveAboutMoreClients(formData).subscribe({
        next: (res: any) => {
          this.clientForm.reset();
          this.clientForm.enable();
          this.fetchAboutPage();
          this.toastr.success(`Updated Successfully`);
        },
        error: (err: any) => {
          this.clientForm.enable();
        },
      });
    }
  }
  onClientReviewSubmit() {
    this.reviewForm.markAllAsTouched();
    if (this.reviewForm.valid) {
      this.reviewForm.disable();
      let formData = this.reviewForm.getRawValue();

      this.pageService.saveAboutMoreClientReviews(formData).subscribe({
        next: (res: any) => {
          this.reviewForm.reset();
          this.reviewForm.enable();
          this.fetchAboutPage();
          this.toastr.success(`Updated Successfully`);
        },
        error: (err: any) => {
          this.reviewForm.enable();
        },
      });
    }
  }
}
