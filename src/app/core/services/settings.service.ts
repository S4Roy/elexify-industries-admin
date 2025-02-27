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
  userTypeList(params: URLSearchParams) {
    return this.httpService.get(`admin/user/type?${params.toString()}`);
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
  siteInfoDetails() {
    return this.httpService.get(`admin/setting/site-info/details`);
  }
  updateSiteInfoDetails(payload: any) {
    return this.httpService.postFormData(
      `admin/setting/save/site-info`,
      payload
    );
  }
  pageDetails(params: URLSearchParams) {
    return this.httpService.get(`admin/setting/cms/page/details?${params.toString()}`);
  }
  updatePageDetails(payload: any) {
    return this.httpService.post(
      `admin/setting/cms/page/${payload?.page_id?'edit':'add'}`,
      payload
    );
  }
  userList(params: URLSearchParams) {
    return this.httpService.get(`admin/user/list?${params.toString()}`);
  }
  submitUser(payload: any) {
    if (payload?.id) {
      return this.httpService.post('admin/user/edit', payload);
    } else {
      return this.httpService.post('admin/user/add', payload);
    }
  }
  deleteUser(payload: any) {
    return this.httpService.post('admin/user/delete', payload);
  }
  userDetails(id: string) {
    return this.httpService.get(`admin/user/details/${id.toString()}`);
  }

  teamList(params: URLSearchParams) {
    return this.httpService.get(`admin/team/list?${params.toString()}`);
  }
  submitTeamMember(payload: any) {
    if (payload?.id) {
      return this.httpService.postFormData('admin/team/edit', payload);
    } else {
      return this.httpService.postFormData('admin/team/add', payload);
    }
  }
  deleteTeamMember(payload: any) {
    return this.httpService.post('admin/team/delete', payload);
  }
  teamMemberDetails(id: string) {
    return this.httpService.get(`admin/team/details/${id.toString()}`);
  }
}
