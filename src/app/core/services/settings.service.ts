import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private httpService: HttpService) {}

  faqCategoryList(params: URLSearchParams) {
    return this.httpService.get(`admin/faq/category/list?${params.toString()}`);
  }
  submitFaqCategory(payload: any) {
    if (payload?.id) {
      return this.httpService.post('admin/faq/category/edit', payload);
    } else {
      return this.httpService.post('admin/faq/category/add', payload);
    }
  }
  deleteFaqCategory(payload: any) {
    return this.httpService.post('admin/faq/category/delete', payload);
  }
  faqList(params: URLSearchParams) {
    return this.httpService.get(`admin/faq/list?${params.toString()}`);
  }
  submitFAQ(payload: any) {
    if (payload?.id) {
      return this.httpService.post('admin/faq/edit', payload);
    } else {
      return this.httpService.post('admin/faq/add', payload);
    }
  }
  deleteFAQ(payload: any) {
    return this.httpService.post('admin/faq/delete', payload);
  }
}
