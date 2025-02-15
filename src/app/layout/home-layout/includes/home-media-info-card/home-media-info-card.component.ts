import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-home-media-info-card',
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home-media-info-card.component.html',
  styleUrl: './home-media-info-card.component.scss'
})
export class HomeMediaInfoCardComponent {
  
  awardCertificateList: any = [];
  formGroup!: FormGroup;
  constructor(
    private toastr: ToastrService,
    private master: MasterService,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      "id": [null],
      "heading_text_1": [null, Validators.required],
      "heading_text_2": [null, Validators.required],
      "certificate": [null, Validators.required],
      "awards": [null]
    })
  }
 
  ngOnInit(): void {
    this.getAwardCertificateList();
  }
  getAwardCertificateList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getAwardCertificateList(params).pipe().subscribe(
      (res: any) => {
        console.log(res);
        let awd: any = Array.isArray(res?.award_list)
          ? res.award_list.map((item: any) => item.id)
          : [];
        
        this.awardCertificateList = res?.award_list;
        this.formGroup.patchValue({
          heading_text_1: res.heading_text_1,
          heading_text_2: res.heading_text_2,
          certificate:res.certificate,
          awards: awd,
          id: res?.setting_id
        });
        console.log(this.formGroup.value);

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
    console.log(this.formGroup.getRawValue());
    if (this.formGroup.valid) {
      let formData = this.formGroup.getRawValue()
      if (!formData?.id) {
        delete formData?.id
      }
      this.master.addAwardCertificate(formData).pipe().subscribe(
        (res: any) => {
          console.log(res);
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
