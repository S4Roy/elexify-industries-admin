import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Params } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpService: HttpService) {}

  fetchCategories(payload: any) {
    return this.httpService.getList('api/ExpenseCategories', payload);
  }
  fetchCity(payload: any) {
    return this.httpService.getList('api/City', payload);
  }
  fetchCompany() {
    return this.httpService.get('api/CompanyProfile');
  }
  fetchCompnayAccounts(payload: any) {
    return this.httpService.getList(
      'api/CompanyProfile/GetCompnayAccounts',
      payload
    );
  }
  updateCompany(payload: any) {
    return this.httpService.post('api/CompanyProfile', payload);
  }
  fetchEmployees(payload: any) {
    return this.httpService.getList('api/User/GetUsers', payload);
  }
  submitEmployee(payload: any) {
    if (payload?.id) {
      return this.httpService.put('api/User/' + payload?.id, payload);
    } else {
      return this.httpService.post('api/User', payload);
    }
  }

  deleteEmployee(employee_id: string) {
    return this.httpService.delete('api/User/' + employee_id);
  }
  deleteExpenseDocument(id: string) {
    return this.httpService.delete('api/Expense/DeleteExpenseDocument/' + id);
  }
  fetchRoles(payload: any) {
    return this.httpService.getList('api/Role', payload);
  }

  submitRole(payload: any) {
    if (payload?.id) {
      return this.httpService.put('api/Role/' + payload?.id, payload);
    } else {
      return this.httpService.post('api/Role', payload);
    }
  }
  roleDetails(id: string) {
    return this.httpService.get('api/Role/' + id);
  }

  deleteRole(id: string) {
    return this.httpService.delete('api/Role/' + id);
  }
  deletePolicy(id: string) {
    return this.httpService.delete('api/PoliciesTravel/PoliciesDetail/' + id);
  }
  fetchGrades(payload: any) {
    return this.httpService.getList('api/Grade', payload);
  }
  submitGrade(payload: any) {
    if (payload?.id) {
      return this.httpService.put('api/Grade/' + payload?.id, payload);
    } else {
      return this.httpService.post('api/Grade', payload);
    }
  }
  gradeDetails(id: string) {
    return this.httpService.get('api/Grade/' + id);
  }

  deleteGrade(id: string) {
    return this.httpService.delete('api/Grade/' + id);
  }
  //================================== DEPARTMENTS //=========================================
  fetchDepartments(payload: any) {
    return this.httpService.getList('api/Department', payload);
  }
  submitDepartment(payload: any) {
    if (payload?.id) {
      return this.httpService.put('api/Department/' + payload?.id, payload);
    } else {
      return this.httpService.post('api/Department', payload);
    }
  }
  gradeDepartment(id: string) {
    return this.httpService.get('api/Department/' + id);
  }

  deleteDepartment(id: string) {
    return this.httpService.delete('api/Department/' + id);
  }
  addBasicPolicyDetails(payload: any) {
    if (payload.id) {
      return this.httpService.put('api/PoliciesTravel/', payload);
    } else {
      return this.httpService.post('api/PoliciesTravel/', payload);
    }
  }
  addPoliciesSetting(payload: any) {
    if (payload.id) {
      return this.httpService.put(
        'api/PoliciesTravel/UpdatePoliciesSetting',
        payload
      );
    } else {
      return this.httpService.post(
        'api/PoliciesTravel/AddPoliciesSetting',
        payload
      );
    }
  }
  getPoliciesSetting(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetPoliciesSetting',
      payload
    );
  }
  addTravelMode(payload: any) {
    if (payload.isMaster) {
      return this.httpService.post('api/PoliciesTravel/AddTravelMode', payload);
    } else {
      return this.httpService.put(
        'api/PoliciesTravel/UpdateTravelMode',
        payload
      );
    }
  }
  addConveyance(payload: any) {
    if (payload.isMaster) {
      return this.httpService.post('api/PoliciesTravel/AddConveyance', payload);
    } else {
      return this.httpService.put(
        'api/PoliciesTravel/UpdateConveyance',
        payload
      );
    }
  }
  addLodingAndFooding(payload: any, addItem: any) {
    if (addItem) {
      return this.httpService.post(
        'api/PoliciesTravel/AddPoliciesLodgingFooding',
        payload
      );
    } else {
      return this.httpService.put(
        'api/PoliciesTravel/UpdatePoliciesLodgingFooding',
        payload
      );
    }
  }
  fetchPoliciesTravelModes(payload: any) {
    return this.httpService.getList('api/PoliciesTravel/', payload);
  }
  fetchConveyance(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetConveyance/',
      payload
    );
  }
  fetchPolicy(payload: any) {
    return this.httpService.postList(
      'api/PoliciesTravel/GetAllPoliciesDetail',
      payload
    );
  }
  getPoliciesLodgingFooding(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetPoliciesLodgingFooding',
      payload
    );
  }
  submitTripBasicData(payload: any) {
    if (payload?.id) {
      return this.httpService.put('api/Trip', payload);
    } else {
      return this.httpService.post('api/Trip', payload);
    }
  }
  deleteTrip(id: string) {
    return this.httpService.delete('api/Trip/' + id);
  }
  fetchTrips(payload: any) {
    return this.httpService.getList('api/Trip', payload);
  }
  fetchAllPurpose(payload: any) {
    return this.httpService.get('api/Trip/GetAllPurpose', payload);
  }
  getTripItinerary(payload: any) {
    return this.httpService.getList('api/Trip/GetAllTripItinerary', payload);
  }
  addTripItinerary(payload: any, addItem: any) {
    if (addItem) {
      return this.httpService.post('api/Trip/AddTripItinerary', payload);
    } else {
      return this.httpService.put('api/Trip/UpdateTripItinerary', payload);
    }
  }
  getTripHotelBooking(payload: any) {
    return this.httpService.getList('api/Trip/GetAllTripHotelBooking', payload);
  }
  addTripHotelBooking(payload: any, addItem: any) {
    if (addItem) {
      return this.httpService.post('api/Trip/AddTripHotelBooking', payload);
    } else {
      return this.httpService.put('api/Trip/UpdateTripHotelBooking', payload);
    }
  }

  addTravelDeskExpense(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateTripItineraryBookStatus',
      payload
    );
  }
  deleteTravelDocument(id: string) {
    return this.httpService.delete('api/Expense/DeleteTravelDocument/' + id);
  }
  fetchExpenses(payload: any) {
    return this.httpService.getList(
      'api/Expense/GetAllExpensesDetailsList',
      payload
    );
  }
  fetchExpensesGroupWise(payload: any) {
    return this.httpService.getList(
      'api/Expense/GetAllExpensesDetailsListGroupWise',
      payload
    );
  }
  getExpensesDetailsReportDateWise(id: string) {
    return this.httpService.get(
      'api/Expense/GetExpensesDetailsReportDateWise/' + id
    );
  }
  deleteExpenseMaster(id: string) {
    return this.httpService.delete('api/Expense/DeleteMasterExpense/' + id);
  }
  deleteItineraryTicketBooking(id: string) {
    return this.httpService.delete(
      'api/Trip/DeleteItineraryTicketBooking/' + id
    );
  }
  deleteExpense(id: string) {
    return this.httpService.delete('api/Expense/' + id);
  }
  updateMasterExpenseStatus(payload: any) {
    return this.httpService.put(
      'api/Expense/UpdateMasterExpenseStatus/' + payload?.id,
      payload
    );
  }
  updateTripStatus(payload: any) {
    return this.httpService.put('api/Trip/UpdateTripStatus', payload);
  }
  updateStatusTripRequestAdvanceMoney(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateStatusTripRequestAdvanceMoney',
      payload
    );
  }
  updateExpenseStatus(payload: any) {
    return this.httpService.put(
      'api/Expense/UpdateExpenseStatus/' + payload?.id,
      payload
    );
  }
  fetchExpenseCategories(payload: any) {
    return this.httpService.getList('api/ExpenseCategories', payload);
  }
  submitExpenseCategory(payload: any) {
    if (payload?.id) {
      return this.httpService.put(
        'api/ExpenseCategory/' + payload?.id,
        payload
      );
    } else {
      return this.httpService.post('api/ExpenseCategory', payload);
    }
  }
  deleteExpenseCategory(id: string) {
    return this.httpService.delete('api/ExpenseCategory/' + id);
  }
  addUpdateGST(payload: any) {
    return this.httpService.post('api/CompanyProfile/AddUpdateGST', payload);
  }
  submitVehicleType(payload: any) {
    if (payload?.id) {
      return this.httpService.put(
        'api/VehicleManagement/VehicleType/' + payload?.id,
        payload
      );
    } else {
      return this.httpService.post(
        'api/VehicleManagement/VehicleType',
        payload
      );
    }
  }
  fetchVehicleManagements(payload: any) {
    return this.httpService.getList(
      'api/VehicleManagement/VehicleManagements',
      payload
    );
  }
  deleteVehicleType(id: string) {
    return this.httpService.delete('api/VehicleManagement/VehicleType/' + id);
  }
  getVehicleType(id: string) {
    return this.httpService.get(
      'api/VehicleManagement/VehicleManagement/' + id
    );
  }
  getVehicleManagementRates(id: string) {
    return this.httpService.get(
      'api/VehicleManagement/VehicleManagementRates/' + id
    );
  }
  fetchVehicleConveyance(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetPoliciesVehicleConveyance',
      payload
    );
  }
  addPoliciesVehicleConveyance(payload: any, addItem: boolean) {
    if (addItem) {
      return this.httpService.post(
        'api/PoliciesTravel/AddPoliciesVehicleConveyance',
        payload
      );
    } else {
      return this.httpService.put(
        'api/PoliciesTravel/UpdatePoliciesVehicleConveyance',
        payload
      );
    }
  }
  submitTravelDocument(payload: any, addItem: boolean) {
    if (addItem) {
      return this.httpService.post('api/Expense/AddTravelDocument', payload);
    } else {
      return this.httpService.post('api/Expense/UpdateTravelDocument', payload);
    }
  }
  requestAdvance(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateTripRequestAdvanceMoney',
      payload
    );
  }
  fetchTripTrackings(payload: any) {
    return this.httpService.getList('api/Trip/GetTripTrackings', payload);
  }
  addTripRemarks(payload: any) {
    return this.httpService.post('api/Trip/AddTripTracking', payload);
  }
  fetchExpenseTrackings(payload: any) {
    return this.httpService.getList('api/Expense/GetExpenseTrackings', payload);
  }
  addtExpenseRemarks(payload: any) {
    return this.httpService.post('api/Expense/AddExpenseTracking', payload);
  }
  getTravelDocument(payload: any) {
    return this.httpService.getList(
      `api/Expense/GetTravelDocument/${payload?.userid}`,
      payload
    );
  }
  downloadExpenseReceipt(id: string) {
    return this.httpService.downloadFile(`api/Expense/${id}/download`);
  }
  downloadTravelDeskExpenseReceipt(id: string) {
    return this.httpService.downloadFile(
      `api/Expense/${id}/downloadTravelDeskFile`
    );
  }
  downloadTravelDocument(id: string) {
    return this.httpService.downloadFile(
      `api/Expense/${id}/downloadTravelDocument`
    );
  }
  getPages() {
    return this.httpService.get(`api/Pages`);
  }
  getActions() {
    return this.httpService.get(`api/Actions`);
  }
  updateTripItineraryBookStatus(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateTripItineraryBookStatus',
      payload
    );
  }
  addItineraryTicketBooking(payload: any) {
    return this.httpService.post('api/Trip/AddItineraryTicketBooking', payload);
  }
  rescheduleTripItineraryHotel(payload: any) {
    return this.httpService.put(
      'api/Trip/RescheduleTripItineraryHotel',
      payload
    );
  }
  updateItineraryTicketBooking(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateItineraryTicketBooking',
      payload
    );
  }
  updateExpenseAndMasterExpense(payload: any) {
    return this.httpService.put(
      'api/Expense/UpdateExpenseAndMasterExpense',
      payload
    );
  }
  getPoliciesLodgingFoodingAllowanceByUser(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetPoliciesLodgingFoodingAllowanceByUser',
      payload
    );
  }
  GetConveyanceAllowanceByUser(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetConveyanceAllowanceByUser',
      payload
    );
  }
  GetPoliciesMISCAllowanceByUser(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetPoliciesMISCAllowanceByUser',
      payload
    );
  }
  GetPoliciesVehicleConveyanceAllowanceByUser(payload: any) {
    return this.httpService.getList(
      'api/PoliciesTravel/GetPoliciesVehicleConveyanceAllowanceByUser',
      payload
    );
  }
  dashboardData(payload: any) {
    return this.httpService.post(`api/Dashboard/StatisticsReport`, payload);
  }
  dashboardGetYearlyExpenseReportData(payload: any) {
    return this.httpService.get(
      `api/Dashboard/GetYearlyExpenseReport/${payload?.year}/${payload?.companyAccountId}`
    );
  }
  updateExpenseBill(payload: any) {
    return this.httpService.put(`api/Expense/${payload?.id}`, payload);
  }
  deleteTripItinerary(Id: string) {
    return this.httpService.delete('api/Trip/DeleteTripItinerary/' + Id);
  }
  deleteTripHotelBooking(Id: string) {
    return this.httpService.delete('api/Trip/DeleteTripHotelBooking/' + Id);
  }
  getStates() {
    return this.httpService.get(`api/State`);
  }
  addGSTDetails(payload: any) {
    return this.httpService.post(
      'api/CompanyProfile/AddUpdateStateWiseGST',
      payload
    );
  }
  getAddedGST(accountId: string) {
    return this.httpService.get(
      'api/CompanyProfile/GetCompanyGST/' + accountId
    );
  }
  deleteGST(Id: string) {
    return this.httpService.delete('api/CompanyProfile/DeleteCompanyGST/' + Id);
  }
  deleteCompany(Id: string) {
    return this.httpService.delete(
      'api/CompanyProfile/DeleteCompnayAccounts/' + Id
    );
  }
  fetchBranches() {
    return this.httpService.get('api/Branch');
  }
  getExistingExpenseByTrip(id: string) {
    return this.httpService.get(`api/Expense/GetExistingExpenseByTrip/${id}`);
  }

  deleteBranches(params: URLSearchParams): Observable<any> {
    return this.httpService.delete('api/Branch?' + params.toString());
  }

  submitBranchMaster(payload: any) {
    if (payload?.id) {
      return this.httpService.put('api/Branch', payload);
    } else {
      return this.httpService.post('api/Branch', payload);
    }
  }
  downloadAllExpenseAttachment(id: string) {
    return this.httpService.get('api/Expense/DownloadAllExpenseZipFile/' + id);
  }
  getUserInfoDetails(payload: any) {
    return this.httpService.get('api/User/GetUserInfoDetails/' + payload?.id);
  }
  downloadUserManual() {
    return this.httpService.get('api/User/DownloadUserManual');
  }
  downloadCompanyAccountLogo(id: string) {
    return this.httpService.downloadFile(
      `api/CompanyProfile/${id}/downloadCompanyAccountLogo`
    );
  }
  getDownloadLink(os: string): Observable<any> {
    // Assuming the API returns a URL in the response body
    return this.httpService.get(`api/FileUpload/${os}`).pipe(
      map((response: any) => {
        // Extract the download URL from the response
        const downloadUrl = response.downloadUrl; // Adjust according to actual response structure

        // Redirect to the download URL
        window.location.href = downloadUrl;

        // Return the response for further processing if needed
        return response;
      })
    );
  }
  HRMSLoginVerify(params: URLSearchParams) {
    return this.httpService.get(
      'api/Authentication/HRMSLoginVerify?' + params.toString()
    );
  }
}
