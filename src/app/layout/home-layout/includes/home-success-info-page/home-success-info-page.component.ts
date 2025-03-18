import { Component } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { MenuComponent } from '../menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import * as Global from '../../../../global';
@Component({
  selector: 'app-home-success-info-page',
  imports: [
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './home-success-info-page.component.html',
  styleUrl: './home-success-info-page.component.scss',
})
export class HomeSuccessInfoPageComponent {
  formGroup!: FormGroup;
  successStoryList: any = [];
  blogList: any = [];
  Global = Global;
  constructor(
    private fb: FormBuilder,
    private master: MasterService,
    private toastr: ToastrService
  ) {
    this.formGroup = this.fb.group({
      id: [null],
      blogs: [null],
    });
  }

  ngOnInit(): void {
    this.getBlogList();
    this.getSuccessStoryList();
  }
  confirmationMessage: string = '';
  onBlogsChange(selectedItems: any[]) {
    if (selectedItems?.length > 3) {
      // selectedItems.pop();
      this.formGroup.patchValue({ blogs: selectedItems });
      this.confirmationMessage = 'You can only select up to 3 items.';
      setTimeout(() => {
        this.confirmationMessage = '';
      }, 10000); // 10000 milliseconds = 10 seconds
      this.getSuccessStoryList();
    } else {
      this.confirmationMessage = '';
    }
  }

  getSuccessStoryList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master
      .getSuccessStoryList(params)
      .pipe()
      .subscribe(
        (res: any) => {
          let blog = res?.results.map((item: any) => {
            return item.id;
          });
          this.formGroup.patchValue({ id: res?.setting_id, blogs: blog });
        },
        (err) => {
          // this.loading = LoadingState.Ready;
        }
      );
  }
  getBlogList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master
      .getBlogList(params)
      .pipe()
      .subscribe(
        (res: any) => {
          this.blogList = res?.results;
        },
        (err) => {
          // this.loading = LoadingState.Ready;
        }
      );
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      if (!formData.id) {
        delete formData.id;
      }
      this.master
        .addSuccessStory(formData)
        .pipe()
        .subscribe(
          (res: any) => {
            this.formGroup.enable();

            this.toastr.success('Data Saved Successfully!', '', {
              timeOut: 1000, // Display for 1 seconds
            });
            this.getSuccessStoryList();
          },
          (err) => {
            this.formGroup.enable();

            this.toastr.error(err.error.msg, '', {
              timeOut: 1000,
            });
          }
        );
    }
  }
}
