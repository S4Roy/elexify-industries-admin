import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../../../../core/services/settings.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import * as Global from '../../../../../../global';
@Component({
  selector: 'app-new-custom-page',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgxEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './new-custom-page.component.html',
  styleUrl: './new-custom-page.component.scss',
})
export class NewCustomPageComponent {
  Global = Global;
  formGroup!: FormGroup;
  editInfo: boolean = false;
  editor!: Editor;
  id: any = null;
  constructor(
    private settingService: SettingsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.formGroup = this.fb.group({
      title: [null, Validators.required],
      content: ['null', Validators.required],
      status: ['active', Validators.required],
    });
    if (this.id) {
      this.fetchCMSData();
    }
  }

  fetchCMSData() {
    let params = new URLSearchParams();
    params.set('page_id', this.id);
    this.settingService.customPageDetails(params).subscribe({
      next: (res: any) => {
        this.formGroup.patchValue({
          content: res?.page_content ?? null,
          page_id: res?.page_id ?? null,
          title: res?.page_title ?? null,
          status: res?.status ?? null,
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

      this.settingService.submitCustomPage(formData).subscribe({
        next: (res: any) => {
          this.editInfo = !this.editInfo;
          this.router.navigateByUrl('/settings/custom-page');
          this.toastr.success(`Updated Successfully`);
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
