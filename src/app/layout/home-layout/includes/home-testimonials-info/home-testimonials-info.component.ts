import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-testimonials-info',
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './home-testimonials-info.component.html',
  styleUrl: './home-testimonials-info.component.scss'
})
export class HomeTestimonialsInfoComponent {

  awardCertificateList: any = [];
  formGroup!: FormGroup;
  testimonialsList :any =[];

  constructor(
    private toastr: ToastrService,
    private master: MasterService,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      "id": [null],
      "title": [null, Validators.required],
      "description": [null, Validators.required],
      "news": [null],
      "client_tele": [null]
    })
  }
 
  ngOnInit(): void {
    this.getTestimonialsList();
    this.getNewsList();
    this.getClientList();
  }

  onNewsChange(selectedItems: any[]) {
    console.log(selectedItems,"selectedItemsselectedItemsselectedItems")
    if (selectedItems.length > 4) {
      // If more than 5 items are selected, remove the last selected item
      selectedItems.pop();
      this.formGroup.patchValue({ news: selectedItems });
      alert('You can only select up to 5 items.'); // Optional alert
    }
  }

  getTestimonialsList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getTestimonialsList(params).pipe().subscribe(
      (res: any) => {
        console.log(res,"TestimonialsListTestimonialsListTestimonialsListTestimonialsList");
        let nw: any = Array.isArray(res?.news)
          ? res.news.map((item: any) => item.id)
          : [];

          let clt: any = Array.isArray(res?.client_tele)
          ? res.client_tele.map((item: any) => item.id)
          : [];
        
        this.testimonialsList = res;
        this.formGroup.patchValue({
          title: res.title,
          description: res.description,
          news: nw,
          client_tele:clt,
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

  getNewsList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getNewsList(params).pipe().subscribe(
      (res: any) => {
        //console.log(res);
      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  getClientList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getClientList(params).pipe().subscribe(
      (res: any) => {
       // console.log(res);
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
      this.master.saveTestimonials(formData).pipe().subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.testimonialsList();
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
