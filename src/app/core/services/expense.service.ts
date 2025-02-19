import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private httpService: HttpService) {}
  addExpenseWithDetails(payload: any, addItem: any) {
    if (addItem) {
      return this.httpService.post(
        'api/Expense/AddExpenseWithDetails',
        payload
      );
    } else {
      return this.httpService.post(
        'api/Expense/UpdateExpenseWithDetails',
        payload
      );
    }
  }
  addLocalConveyanceExpense(payload: any, update: any) {
    if (update) {
      return this.httpService.put(
        'api/Expense/UpdateLocalConveyanceExpense',
        payload
      );
    } else {
      return this.httpService.post(
        'api/Expense/AddLocalConveyanceExpense',
        payload
      );
    }
  }
  updateLocalConveyanceExpense(payload: any) {
    return this.httpService.put(
      'api/Expense/UpdateLocalConveyanceExpense',
      payload
    );
  }
  UpdateAllExpenseStatus(payload: any) {
    return this.httpService.put(
      'api/Expense/AllUpdateExpenseStatus',
      payload
    );
  }
  updateMasterExpenseStatus(payload: any) {
    return this.httpService.put(
      'api/Expense/UpdateMasterExpenseStatus/' + payload?.id,
      payload
    );
  }
  getExpensesLocalConveyance(payload: any) {
    return this.httpService.getList(
      'api/Expense/GetExpensesLocalConveyance',
      payload
    );
  }
  deleteLocalConveyanceExpense(id: string) {
    return this.httpService.delete(
      'api/Expense/DeleteLocalConveyanceExpense/' + id
    );
  }
  deleteLocalConveyanceExpenseDocument(id: string) {
    return this.httpService.delete(
      'api/Expense/DeleteLocalConveyanceExpenseDocument/' + id
    );
  }

  addCarBikeLogBookExpense(payload: any, update: any) {
    if (update) {
      return this.httpService.put(
        'api/Expense/UpdateCarBikeLogBookExpense',
        payload
      );
    } else {
      return this.httpService.post(
        'api/Expense/AddCarBikeLogBookExpense',
        payload
      );
    }
  }
  getCarBikeLogBookExpense(payload: any) {
    return this.httpService.getList(
      'api/Expense/GetCarBikeLogBookExpense',
      payload
    );
  }
  updateCarBikeLogBookExpense(payload: any) {
    return this.httpService.put(
      'api/Expense/UpdateCarBikeLogBookExpense',
      payload
    );
  }
  deleteCarBikeLogBookExpense(id: string) {
    return this.httpService.delete(
      'api/Expense/DeleteCarBikeLogBookExpense/' + id
    );
  }
  deleteCarBikeLogBookExpenseDocument(id: string) {
    return this.httpService.delete(
      'api/Expense/DeleteCarBikeLogBookExpenseDocument/' + id
    );
  }
  deleteExpenseByDate(payload: any) {
    return this.httpService.delete('api/Expense/DeleteExpenseByDate', payload);
  }  
  addExpenseDetails(payload: any) {
    return this.httpService.post('api/Expense/AddExpenseDetails', payload);
  }  
  updateExpenseDetails(payload: any) {
    return this.httpService.put('api/Expense/UpdateExpenseDetails', payload);
  }
  AllAccountUpdateExpenseAndMasterExpense(payload: any) {
    return this.httpService.put(
      'api/Expense/AllAccountUpdateExpenseAndMasterExpense',
      payload
    );
  }  
  UpdateAllExpenseAndMasterExpenseApprovalLevel(payload: any) {
    return this.httpService.put(
      'api/Expense/UpdateAllExpenseAndMasterExpenseApprovalLevel',
      payload
    );
  }
  updateExpenseAccountTeam(payload: any) {
    return this.httpService.put(
      'api/Expense/ChangeExpenseAccountTeam',
      payload
    );
  }
}
