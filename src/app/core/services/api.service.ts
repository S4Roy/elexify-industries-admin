import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Params } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpService: HttpService) {}

  customerList(params: any) {
    return this.httpService.get(`admin/customer/list?${params.toString()}`);
  }
}
