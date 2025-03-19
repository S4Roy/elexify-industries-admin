import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import * as Global from '../../../../../../global';
import { SettingsService } from '../../../../../../core/services/settings.service';
import { MenuComponent } from '../../../../includes/menu/menu.component';
import { Editor, NgxEditorModule } from 'ngx-editor';
@Component({
  selector: 'app-add-team-member',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgIf,
    MenuComponent,
    NgxEditorModule
  ],
  templateUrl: './add-team-member.component.html',
  styleUrl: './add-team-member.component.scss',
})
export class AddTeamMemberComponent {
  Global = Global;
  formGroup!: FormGroup;
  toogleTextPassword: boolean = false;
  role_list: any = [];
  editor!: Editor;

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private settingService: SettingsService,
    private dialogRef: MatDialogRef<AddTeamMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editor = new Editor();

    this.formGroup = this.fb.group({
      designation: [null, Validators.compose([Validators.required])],
      member_name: [null, Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      facebook_link: [null],
      linkedin_link: [null],
      twitter_link: [null],
      status: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
      file_preview: [null],
    });
    if (this.data?.id) {
      this.teamMemberDetails();
    }
  }
  submitMember() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      if (this.data?.id) {
        formData.id = this.data.id;
      }
      delete formData.file_preview;
      if (!formData.file) {
        delete formData.file;
      }
      this.settingService.submitTeamMember(formData).subscribe({
        next: (res: any) => {
          this.toastr.success(`Member ${this.data?'updated':'added'} Successfully`);
          this.formGroup.enable();
          this.formGroup.reset();
          this.dialogRef.close(res);
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }

  teamMemberDetails() {
    this.settingService.teamMemberDetails(this.data.id).subscribe({
      next: (res: any) => {
        this.formGroup.patchValue({
          member_name: res?.member_name,
          designation: res?.designation,
          description: res?.description??"",
          facebook_link: res?.facebook_link,
          linkedin_link: res?.linkedin_link,
          twitter_link: res?.twitter_link,
          status: res?.status,
          file_preview: res?.file_path
            ? Global.BACKEND_URL + res?.file_path
            : null,
        });
        this.formGroup.get('file')?.clearValidators();
        this.formGroup.get('file')?.updateValueAndValidity();
      },
      error: (err) => {},
    });
  }
}
