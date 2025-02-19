import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private httpService: HttpService) {}
  // needed
  addVendor(payload: any) {
    if (payload.id) {
      return this.httpService.put('api/Vendor', payload);
    } else {
      return this.httpService.post('api/Vendor', payload);
    }
  }
  getVendors(payload: any) {
    return this.httpService.getList('api/Vendor/GetVendors', payload);
  }
  deleteVendor(id: string) {
    return this.httpService.delete('api/Vendor/' + id);
  }  
  getExpenseCategory(id: string) {
    return this.httpService.get('api/ExpenseCategory/' + id);
  }
}
