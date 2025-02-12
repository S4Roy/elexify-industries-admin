import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input,EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { MasterService } from '../../../../../core/services/master.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enquiry',
  imports: [NgFor, MenuComponent, NgIf,DatePipe],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.scss',
})
export class EnquiryComponent {
  @Input() dashboard: boolean = false;
  @Output() enquiryTotalCountChange = new EventEmitter<number>();
  latestEnquiryList: any = [];
  constructor(
    private toastr: ToastrService,
    private masterService: MasterService,
  ) {
    //this.enquiryList = [1, 2, 3, 4, 4, 5, 5, 6, 6];
  }

  ngOnInit(): void {
    this.getLatestEnquiryList(); 
  }
  ngOnChanges() {
    if (this.dashboard) {
      this.latestEnquiryList = [1, 2, 3];
    }
  }

  getLatestEnquiryList(){
    let params: URLSearchParams = new URLSearchParams();
    this.masterService.getLatestEnquiryList(params).pipe(delay(0)).subscribe(
      (res: any) => {
        
         this.latestEnquiryList = res['results'];
         this.enquiryTotalCountChange.emit(res.total_count);
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
