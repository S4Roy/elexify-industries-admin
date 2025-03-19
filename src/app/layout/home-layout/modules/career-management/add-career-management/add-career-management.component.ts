import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PageService } from '../../../../../core/services/page.service';
import * as Global from '../../../../../global';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { Editor, NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-add-career-management',
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    NgFor,
    NgxEditorModule,
  ],
  templateUrl: './add-career-management.component.html',
  styleUrls: ['./add-career-management.component.css'],
})
export class AddCareerManagementComponent implements OnInit {
  Global = Global;

  formGroup: FormGroup;

  data: any = null;
  category_list: any = [];
  id: any = null;
  responsibilitiesEditor!: Editor;
  requirementsEditor!: Editor;
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {
    this.responsibilitiesEditor = new Editor();
    this.requirementsEditor = new Editor();
    this.id = this.route.snapshot.params['id'];
    this.formGroup = this.fb.group({
      title: [null, Validators.required],
      job_no: [null, Validators.required],
      experience_level: [null, Validators.required],
      job_location: [null, Validators.required],
      job_type: [null, Validators.required],
      year_of_experience: [null, Validators.required],
      work_mode: [null, Validators.required],
      salary: [null, Validators.required],
      currency_name: ['INR'],
      is_salary_not_disclosed: ['no'],
      language_known: [null, Validators.required],
      no_of_vacancy: [null, Validators.required],
      responsibilities: [null, Validators.required],
      requirements: [null, Validators.required],
      is_urgently_needed: ['no', Validators.required],
      job_status: ['open', Validators.required],
      status: ['active', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.tenderDetails();
    }
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup.disable();
      let formData = this.formGroup.getRawValue();

      if (this.data?.id) {
        formData.id = this.data.id;
      }
      this.pageService.submitCareer(formData).subscribe({
        next: (res: any) => {
          this.toastr.success(
            `Job ${!formData.id ? 'added' : 'updated'} Successfully`
          );
          this.router.navigateByUrl('/career');
          this.formGroup.enable();
        },
        error: (err: any) => {
          this.formGroup.enable();
        },
      });
    }
  }
  tenderCategoryList() {
    this.pageService.tenderCategoryList().subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.category_list = results ?? [];
        // this.paginationOption = { limit, page, total_pages, total_records };
      },
      error: (err) => {},
    });
  }
  tenderDetails() {
    this.pageService.careerDetails(this.id).subscribe({
      next: (res: any) => {
        this.data = res;
        this.formGroup.patchValue(this.data);
        this.formGroup.patchValue({});
      },
      error: (err) => {},
    });
  }
}
