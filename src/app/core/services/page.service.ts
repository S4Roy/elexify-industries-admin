import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private httpService: HttpService) {}

  fetchAboutPage() {
    return this.httpService.get(`admin/about/page`);
  }
  saveAboutUsBanner(payload: any) {
    return this.httpService.postFormData('admin/about/section/save/banner', payload);
  }
   saveAboutUsText(payload: any) {
    return this.httpService.postFormData('admin/about/section/save/about-text', payload);
  }  
   saveAboutUsPartner(payload: any) {
    return this.httpService.postFormData('admin/about/section/save/partner', payload);
  }
  
}
