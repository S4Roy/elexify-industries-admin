import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private httpService: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) { }


  // Enquiry List Page
  getLatestEnquiryList(params: any) {
    return this.httpService.get('admin/dashboard/latest-enquiries', params);
   // return this.http.get(environment.apiEndpoint + 'master/security_question/?'+ params);
  }

  getLatestAnnouncementList(params: any) {
    return this.httpService.get('admin/dashboard/latest-announcement', params);
  }
}
