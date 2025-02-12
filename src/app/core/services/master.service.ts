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
  }
  getLatestAnnouncementList(params: any) {
    return this.httpService.get('admin/dashboard/latest-announcement', params);
  }


  //  sec_1/hero section
  addHeroSectionData(payload: any) {
    return this.httpService.postFormData('admin/home/section/save/hero', payload); 
  }
  getHeroSectionData(params: any) {
    return this.httpService.get('admin/home/section/info/hero', params);
  }
  updateHeroSectionData(id: number, payload: any) {
   // return this.httpService.post('admin/dashboard/latest-announcement' + id + '/', payload);
  }
  deleteHeroSectionData( payload: any) { 
    return this.httpService.post('admin/home/section/delete/hero' , payload);
  }


  // sec_2/about-anctpl    
  addSection_2_Data(payload: any) {
    return this.httpService.postFormData('admin/home/section/save/about-anctpl', payload);
  }
  getAbout_anctplData(params: any) {
    return this.httpService.get('admin/home/section/info/about-anctpl', params);
  }
  updateSection_2_Data(id: number, payload: any) {
    //return this.httpService.post('admin/dashboard/latest-announcement' + id + '/', payload);
  }


  // sec_3/more-about-anctpl
  addSection_3_Data(payload: any) {
    return this.httpService.postFormData('admin/home/section/save/more-about-anctpl', payload);
  }
  getMore_about_anctplData(params: any) {
    return this.httpService.get('admin/home/section/info/more-about-anctpl', params);
  }


}
