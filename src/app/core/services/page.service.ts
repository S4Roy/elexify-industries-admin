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
    return this.httpService.postFormData(
      'admin/about/section/save/banner',
      payload
    );
  }
  saveAboutUsText(payload: any) {
    return this.httpService.postFormData(
      'admin/about/section/save/about-text',
      payload
    );
  }
  saveAboutUsPartner(payload: any) {
    return this.httpService.post('admin/about/section/save/partner', payload);
  }

  partnerList() {
    return this.httpService.get(`admin/partner-list`);
  }
  saveAboutUsBuisnessExecellence(payload: any) {
    return this.httpService.postFormData(
      'admin/about/section/save/business-excellence',
      payload
    );
  }
  deleteCareerCtaImage(payload: any) {
    return this.httpService.post(
      'admin/about/section/delete/career-cta/image',
      payload
    );
  }
  saveCareerCta(payload: any) {
    return this.httpService.post(
      'admin/about/section/save/career-cta',
      payload
    );
  }
  saveAboutUsNewsEvents(payload: any) {
    return this.httpService.postFormData(
      'admin/about/section/save/news-event',
      payload
    );
  }
  newsEventsList() {
    return this.httpService.get(`admin/news-list`);
  }
  jobApplicationStatusList() {
    return this.httpService.get(`admin/job-applicant/status-list`);
  }
  tenderCategoryList() {
    return this.httpService.get(`admin/tender/category/list`);
  }
  galleryList(params: any) {
    return this.httpService.get(
      `admin/media/gallery/list?${params.toString()}`
    );
  }
  addMedia(payload: any) {
    return this.httpService.postFormData(
      `admin/media/gallery/${payload?.id ? 'edit' : 'add'}`,
      payload
    );
  }
  deleteMedia(payload: any) {
    return this.httpService.post(`admin/media/gallery/delete`, payload);
  }
  tenderList(params: any) {
    return this.httpService.get(`admin/tender/list?${params.toString()}`);
  }
  tenderDetails(id: any) {
    return this.httpService.get(`admin/tender/details/${id.toString()}`);
  }
  careerList(params: any) {
    return this.httpService.get(`admin/career/lists?${params.toString()}`);
  }
  careerApplicationList(params: any) {
    return this.httpService.get(
      `admin/career/applicant/list?${params.toString()}`
    );
  }
  careerDetails(id: any) {
    return this.httpService.get(`admin/career/details/${id.toString()}`);
  }
  submitTender(payload: any) {
    return this.httpService.postFormData(
      `admin/tender/${payload?.id ? 'edit' : 'add'}`,
      payload
    );
  }
  submitCareer(payload: any) {
    return this.httpService.post(
      `admin/career/${payload?.id ? 'edit' : 'add'}`,
      payload
    );
  }
  deleteCareer(payload: any) {
    return this.httpService.post(`admin/career/delete`, payload);
  }
  deleteTender(payload: any) {
    return this.httpService.post(`admin/tender/delete`, payload);
  }
  fetchMoreAboutPage() {
    return this.httpService.get(`admin/more-about/page`);
  }
  saveMoreAboutUsBanner(payload: any) {
    return this.httpService.postFormData(
      'admin/more-about/section/save/banner',
      payload
    );
  }
  saveMoreAboutUsText(payload: any) {
    return this.httpService.postFormData(
      'admin/more-about/section/save/about-text',
      payload
    );
  }
  saveCompanyInfo(payload: any) {
    return this.httpService.post(
      'admin/more-about/section/save/company-info',
      payload
    );
  }
  saveMainContent(payload: any) {
    return this.httpService.post(
      'admin/more-about/section/save/main-content',
      payload
    );
  }
  saveAboutMoreClients(payload: any) {
    return this.httpService.post(
      'admin/more-about/section/save/clients',
      payload
    );
  }
  saveAboutMoreClientReviews(payload: any) {
    return this.httpService.post(
      'admin/more-about/section/save/client-review',
      payload
    );
  }
  fetchClients() {
    return this.httpService.get(`admin/client-list`);
  }
  careerApplicationEdit(payload: any) {
    return this.httpService.post(`admin/career/applicant/edit`, payload);
  }
}
