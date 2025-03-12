import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import * as Global from '../../../../global'

@Component({
  selector: 'app-home-progress-section-info-card',
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home-progress-section-info-card.component.html',
  styleUrl: './home-progress-section-info-card.component.scss'
})
export class HomeProgressSectionInfoCardComponent {
  Global=Global
  progressList: any = [];
  galleryList: any = []
  formGroup!: FormGroup;
  isSubmitted :boolean = false;
  constructor(
    private toastr: ToastrService,
    private master: MasterService,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      "id": [null],
      "title": [null, Validators.required],
      "description": [null, Validators.required],
      "gallery": [null]
    })
  }
  get title() {
    return this.formGroup.get('title');
  }

  confirmationMessage: string = '';
  onGalleryChange(selectedItems: any[]) {
      if (selectedItems?.length > 2) {
        selectedItems.pop();
        this.formGroup.patchValue({ gallery: selectedItems });
        this.confirmationMessage = 'You can only select up to 2 items.';
        setTimeout(() => {
          this.confirmationMessage = '';
        }, 10000); // 10000 milliseconds = 10 seconds
        this.getProgressList();
      } else {
        this.confirmationMessage = '';
      }
  }
  

  ngOnInit(): void {
    this.getProgressList();
    this.getGalleryList();
  }
  getGalleryList(data?: any) {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getGalleryList(params).pipe().subscribe(
      (res: any) => {
        this.galleryList = res?.results;

      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  getProgressList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getProgressList(params).pipe().subscribe(
      (res: any) => {
        // let glry =  res?.gallery.map((item:any)=>{
        //   return item.id
        // })
        let glry: any = Array.isArray(res?.gallery)
          ? res.gallery.map((item: any) => item.id)
          : [];
        this.progressList = res?.progress_list;
        this.formGroup.patchValue({
          title: res.title,
          description: res.description,
          gallery: glry,
          id: res?.setting_id
        });

      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  onSubmit() {
    this.isSubmitted =true;
    if (this.formGroup.valid) {
      let formData = this.formGroup.getRawValue()
      if (!formData?.id) {
        delete formData?.id
      }
      this.master.addProgress(formData).pipe().subscribe(
        (res: any) => {
          this.getProgressList()
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
        },
        err => {
          this.toastr.error(err.error.msg, '', {
            timeOut: 1000,
          });
          // this.loading = LoadingState.Ready;
        }
      );
    }
  }
}
