import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private httpService: HttpService) {}
  categoryList(params: any) {
    return this.httpService.get(
      `admin/inventory/category/list?${params.toString()}`
    );
  }
  submitCategory(payload: any) {
    if (payload?._id) {
      return this.httpService.putFormData(
        `admin/inventory/category/edit`,
        payload
      );
    } else {
      return this.httpService.postFormData(
        `admin/inventory/category/add`,
        payload
      );
    }
  }
  deleteCategory(payload: any) {
    return this.httpService.delete(`admin/inventory/category/delete`, payload);
  }

  brandList(params: any) {
    return this.httpService.get(
      `admin/inventory/brand/list?${params.toString()}`
    );
  }
  submitBrand(payload: any) {
    if (payload?._id) {
      return this.httpService.putFormData(
        `admin/inventory/brand/edit`,
        payload
      );
    } else {
      return this.httpService.postFormData(
        `admin/inventory/brand/add`,
        payload
      );
    }
  }
  deleteBrand(payload: any) {
    return this.httpService.delete(`admin/inventory/brand/delete`, payload);
  }

  productList(params: any) {
    return this.httpService.get(
      `admin/inventory/product/list?${params.toString()}`
    );
  }
  productBySlug(slug: string) {
    return this.httpService.get(`admin/inventory/product/details/${slug}`);
  }
  submitProduct(payload: any, add: boolean = true) {
    if (add) {
      return this.httpService.post(`admin/inventory/product/add`, payload);
    } else {
      return this.httpService.put(`admin/inventory/product/edit`, payload);
    }
  }
  deleteProduct(payload: any) {
    return this.httpService.delete(`admin/inventory/product/delete`, payload);
  }
  stockTransactions(params: any) {
    return this.httpService.get(
      `admin/inventory/stock/transactions?${params.toString()}`
    );
  }
  submitStock(payload: any, add: boolean = true) {
    if (add) {
      return this.httpService.post(`admin/inventory/stock/add`, payload);
    } else {
      return this.httpService.put(`admin/inventory/product/edit`, payload);
    }
  }
  orderList(params: any) {
    return this.httpService.get(
      `admin/inventory/order/list?${params.toString()}`
    );
  }
  orderDetails(params: any) {
    return this.httpService.get(
      `admin/inventory/order/details?${params.toString()}`
    );
  }
  pickedItemBySku(params: any) {
    return this.httpService.get(
      `admin/inventory/order/picked-item-by-sku?${params.toString()}`
    );
  }
  scanAndPackItem(params: any) {
    return this.httpService.get(
      `admin/inventory/order/scan-and-pack-item?${params.toString()}`
    );
  }
  orderStats(params: any) {
    return this.httpService.get(
      `admin/inventory/order/stats?${params.toString()}`
    );
  }
}
