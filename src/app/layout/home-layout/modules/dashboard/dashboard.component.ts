import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EnquiryComponent } from '../main/enquiry/enquiry.component';
import { AnnouncementNoticeComponent } from '../main/announcement-notice/announcement-notice.component';
import { RouterModule } from '@angular/router';
import { MasterService } from '../../../../core/services/master.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import * as Global from '../../../../global';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddNewsEventComponent } from '../news-event/add-news-event/add-news-event.component';
import { MenuComponent } from '../../includes/menu/menu.component';
@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    EnquiryComponent,
    // AnnouncementNoticeComponent,
    RouterModule,
    NgFor,
    NgIf,
    MatIconModule,
    DatePipe,
    MenuComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  Global = Global;
  showMore: boolean[] = [];
  news_list: any = [];
  enquiryTotal_count: any;
  isLoading: boolean = false;
  constructor(private masterService: MasterService, private dialog: MatDialog) {
    this.fetchNewsList();
  }
  onEnquiryTotalCountChange(count: number) {
    this.enquiryTotal_count = count;
  }
  addItem(data: any = null) {
    this.dialog
      .open(AddNewsEventComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchNewsList();
        }
      });
  }
  fetchNewsList() {
    this.isLoading = true;
    let params = new URLSearchParams();
    params.set('limit', '3');
    this.masterService.newsList(params).subscribe({
      next: (res: any) => {
        const { results, limit, page, total_pages, total_records } = res;
        this.news_list = results ?? [];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    });
  }
  
}
