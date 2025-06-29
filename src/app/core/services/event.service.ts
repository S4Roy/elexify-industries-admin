// shared/events.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class EventsService {
  private addClickSubject = new Subject<void>();
  addClicked$ = this.addClickSubject.asObservable();
  private showAddBtnSubject = new BehaviorSubject<boolean>(false); // visible by default
  showAddBtn$ = this.showAddBtnSubject.asObservable();

  triggerAddClick() {
    this.addClickSubject.next();
  }
  setAddBtnVisibility(show: boolean) {
    this.showAddBtnSubject.next(show);
  }
}
