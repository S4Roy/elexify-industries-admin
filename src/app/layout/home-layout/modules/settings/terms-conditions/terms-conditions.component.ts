import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { SettingsService } from '../../../../../core/services/settings.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-terms-conditions',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss',
})
export class TermsConditionsComponent {
  formGroup!: FormGroup;
  editInfo: boolean = false;
  editor!: Editor;
  constructor(
    private settingService: SettingsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.editor = new Editor();
    this.formGroup = this.fb.group({
      page_type: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required],
      page_id: [null],
    });
    this.fetchCMSData();
  }

  fetchCMSData() {
    let params = new URLSearchParams();
    params.set('page_type', 'terms-conditions');
    this.settingService.pageDetails(params).subscribe({
      next: (res: any) => {
        this.formGroup.patchValue({
          content: res?.page_content ?? null,
          page_type: res?.page_type ?? null,
          page_id: res?.page_id ?? null,
          title: res?.page_title ?? null,
        });
      },
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
      if (!formData.page_id) {
        delete formData.page_id;
      }
     
      this.settingService.updatePageDetails(formData).subscribe({
        next: (res: any) => {
          this.editInfo = !this.editInfo;
          this.fetchCMSData();
          this.toastr.success(`Details Updated Successfully`);
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
