import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageService } from '../../../../../core/services/page.service';
import { ToastrService } from 'ngx-toastr';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import PaginationOptions from '../../../../../core/models/PaginationOptions';
import * as Global from '../../../../../global';
import { PaginationComponent } from '../../../includes/pagination/pagination.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-career-details',
  imports: [
    MenuComponent,
    TitleCasePipe,
    RouterModule,
    NgIf,
    PaginationComponent,
    NgFor,
    MatIconModule,
    MatTooltipModule,
    NgSelectModule,
    FormsModule,
  ],
  templateUrl: './career-details.component.html',
  styleUrl: './career-details.component.scss',
})
export class CareerDetailsComponent {
  Global = Global;
  showMore: boolean[] = [];
  item_list: any = [];
  statusList: any = [];
  paginationOption: PaginationOptions;
  id: any = null;
  item: any = null;
  applicant_status: any = '';
  constructor(
    private router: Router,
    private pageService: PageService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.paginationOption = Global.resetPaginationOptions();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.careerDetails();
      this.jobApplicationStatusList();
      this.careerApplicationList();
    }
  }
  jobApplicationStatusList() {
    this.pageService.jobApplicationStatusList().subscribe({
      next: (res: any) => {
        this.statusList = res?.results ?? [];
      },
      error: (err: any) => {},
    });
  }
  addItem(data: any = null) {
    this.router.navigateByUrl(
      '/career/' + (data?.id ? 'edit/' + data.id : 'add')
    );
  }

  deleteItem(item: any) {
    this.pageService.deleteCareer({ id: item.id }).subscribe({
      next: (res: any) => {
        this.toastr.success(`Deleted Successfully`);
        this.router.navigateByUrl('/career');
      },
      error: (err: any) => {},
    });
  }
  careerDetails() {
    this.pageService.careerDetails(this.id).subscribe({
      next: (res: any) => {
        this.item = res;
      },
      error: (err) => {},
    });
  }
  careerApplicationList() {
    let params = new URLSearchParams();
    params.set('job_id', this.id);
    if (this.paginationOption.page) {
      params.set('page', String(this.paginationOption.page));
    }
    if (this.applicant_status) {
      params.set('applicant_status', this.applicant_status);
    }
    this.pageService.careerApplicationList(params).subscribe({
      next: (res: any) => {
        this.item_list = res?.data?.docs ?? [];
        this.paginationOption = { ...res?.data };
      },
      error: (err) => {
        this.item_list = [];
      },
    });
  }
  onPageChange(data: any) {
    this.paginationOption.page = data;
    this.careerApplicationList();
  }
  editItem(data: any) {
    this.dialog
      .open(EditApplicationComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.careerApplicationList();
        }
      });
  }
}
