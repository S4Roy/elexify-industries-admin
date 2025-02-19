import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private refresh = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService) {}
  updateRefresh(op: any) {
    this.refresh.next(op);
  }
  refreshData(): Observable<any> {
    return this.refresh.asObservable();
  }
  cancelPacificUser(payload: any) {
    return this.httpService.put('api/Trip/CancelPacificUser', payload);
  }
  cancelRequestTripItineraryHotel(payload: any) {
    return this.httpService.put(
      'api/Trip/CancelRequestTripItineraryHotel',
      payload
    );
  }
  updateItineraryHotelBookingQuotaion(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateItineraryHotelBookingQuotaion',
      payload
    );
  }
  addItineraryTicketBookingQuotaion(payload: any) {
    return this.httpService.post(
      'api/Trip/AddItineraryTicketBookingQuotaion',
      payload
    );
  }
  addItineraryHotelBookingQuotaion(payload: any) {
    return this.httpService.post(
      'api/Trip/AddItineraryHotelBookingQuotaion',
      payload
    );
  }
  UpdateItineraryTicketBookingQuotaionn(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateItineraryTicketBookingQuotaion',
      payload
    );
  }
  addQuotation(payload: any, isItinery: boolean = true) {
    if (isItinery) {
      return this.addItineraryTicketBookingQuotaion(payload);
    } else {
      return this.addItineraryHotelBookingQuotaion(payload);
    }
  }
  addRMQuotationNotes(payload: any, isItinery: boolean = true) {
    if (isItinery) {
      return this.UpdateItineraryTicketBookingQuotaionn(payload);
    } else {
      return this.updateItineraryHotelBookingQuotaion(payload);
    }
  }
  deleteQuotation(Id: string, isItinerary: boolean) {
    if (isItinerary) {
      return this.httpService.delete(
        'api/Trip/DeleteItineraryTicketBookingQuotation/' + Id
      );
    } else {
      return this.httpService.delete(
        'api/Trip/DeleteItineraryHotelBookingQuotation/' + Id
      );
    }
  }
  UpdateAllTripItineraryBookStatus(payload: any) {
    return this.httpService.put(
      'api/Trip/UpdateAllTripItineraryBookStatus',
      payload
    );
  }
  GetAdvanceMoney(payload: any) {
    return this.httpService.getList('api/Trip/GetAdvanceMoney', payload);
  }
  TripRequestAdvanceMoneyApproval(payload: any) {
    return this.httpService.put(
      'api/Trip/TripRequestAdvanceMoneyApproval',
      payload
    );
  }
  addTripItinerary(payload: any) {
    if (!payload?.id) {
      return this.httpService.post('api/Trip/AddTripItinerary', {
        tripItinerary: [payload],
      });
    } else {
      return this.httpService.put('api/Trip/UpdateTripItinerary', {
        tripItinerary: [payload],
      });
    }
  }
  addTripHotelBooking(payload: any) {
    if (!payload?.id) {
      return this.httpService.post('api/Trip/AddTripHotelBooking', {
        tripHotelBooking: [payload],
      });
    } else {
      return this.httpService.put('api/Trip/UpdateTripHotelBooking', {
        tripHotelBooking: [payload],
      });
    }
  }
  deleteItinerary(id: string) {
    return this.httpService.delete(
      'api/Trip/DeleteTripItinerary/' + id
    );
  }  
  deleteTripHotelBooking(id: string) {
    return this.httpService.delete(
      'api/Trip/DeleteTripHotelBooking/' + id
    );
  }
}
