import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterService } from '../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from 'ngx-editor';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-home-testimonials-info',
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
  ],
  templateUrl: './home-testimonials-info.component.html',
  styleUrl: './home-testimonials-info.component.scss',
})
export class HomeTestimonialsInfoComponent {
  formGroup!: FormGroup;
  newsList: any = [];
  client_teleList: any[] = [];

  testimonialsList: any[] = [];
  confirmationMessage: string = '';
  msg: string = '';
  maxLength1: number = 40;
  maxLength2: number = 500;
  isSubmitted: boolean = false; // Flag to track form submission

  constructor(
    private toastr: ToastrService,
    private master: MasterService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(this.maxLength1)]],
      description: [
        '',
        [Validators.required, Validators.maxLength(this.maxLength2)],
      ],
      news: [null],
      client_tele: [null],
    });
  }

  get title() {
    return this.formGroup.get('title');
  }
  get description() {
    return this.formGroup.get('description');
  }

  ngOnInit(): void {
    this.getTestimonialsList();
    this.getNewsList();
    this.getClientList();
  }

  onNewsChange(selectedItems: any[]) {
    if (selectedItems?.length > 3) {
      selectedItems.pop();
      let news: any = Array.isArray(selectedItems)
        ? selectedItems.map((item: any) => item.id)
        : [];
      this.formGroup.patchValue({ news: news });
      this.confirmationMessage = 'You can only select up to 3 items.';
    } else {
      this.confirmationMessage = '';
    }
  }

  // onClientChange(selectedClientItems: any[]) {
  //   if(selectedClientItems.length >2) {
  //     selectedClientItems.pop();
  //     this.formGroup.patchValue({client_tele:selectedClientItems});
  //     this.msg='You can only select up to 3 items.';
  //     setTimeout(() => {
  //       this.msg = '';
  //     }, 10000); // 10000 milliseconds = 10 seconds
  //     this.getTestimonialsList();
  //   } else {
  //     this.msg = '';
  //   }
  // }

  onClientChange(selectedClients: any[]) {
    if (selectedClients.length > 4) {
      selectedClients.pop();
      let client_tele: any = Array.isArray(selectedClients)
        ? selectedClients.map((item: any) => item.id)
        : [];
      this.formGroup.patchValue({ client_tele: client_tele });
      this.toastr.error('You can only select up to 4 clients.', '', {
        timeOut: 10000,
      });
      // Set the confirmation message
      // this.msg = 'You can only select up to 3 clients.';

      // // Clear the confirmation message after 10 seconds
      // setTimeout(() => {
      //   this.msg = '';
      // }, 10000); // 10000 milliseconds = 10 seconds
      // this.getTestimonialsList();
    } else {
      this.msg = '';
    }
  }
  getTestimonialsList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master
      .getTestimonialsList(params)
      .pipe()
      .subscribe(
        (res: any) => {
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
            client_tele: clt,
            id: res?.setting_id,
          });
        },
        (err) => {
          this.toastr.error(err.error.msg, '', {
            timeOut: 1000,
          });
          // this.loading = LoadingState.Ready;
        }
      );
  }

  getNewsList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master
      .getNewsList(params)
      .pipe()
      .subscribe(
        (res: any) => {
          this.newsList = res?.results;
        },
        (err) => {
          this.toastr.error(err.error.msg, '', {
            timeOut: 1000,
          });
          // this.loading = LoadingState.Ready;
        }
      );
  }

  getClientList() {
    let params: URLSearchParams = new URLSearchParams();
    this.master
      .getClientList(params)
      .pipe()
      .subscribe(
        (res: any) => {
          this.client_teleList = res.results;
        },
        (err) => {
          this.toastr.error(err.error.msg, '', {
            timeOut: 1000,
          });
          // this.loading = LoadingState.Ready;
        }
      );
  }

  onSubmit() {
    this.isSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();
      if (!formData?.id) {
        delete formData?.id;
      }
      this.master.saveTestimonials(formData).subscribe(
        (res: any) => {
          this.toastr.success('Data Saved Successfully!', '', {
            timeOut: 1000, // Display for 1 seconds
          });
          this.confirmationMessage = '';
          this.getTestimonialsList();
          this.formGroup.enable();
        },
        (err) => {
          this.toastr.error('Error saving data', '', { timeOut: 1000 });
          this.formGroup.enable();
          // this.toastr.error(err.error.msg, '', {
          //   timeOut: 1000,
          // });
          // this.loading = LoadingState.Ready;
        }
      );
    }
  }
}
