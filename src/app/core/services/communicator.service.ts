// communicator.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicatorService {
  private triggerSubject = new Subject<any>();

  trigger$ = this.triggerSubject.asObservable();

  triggerAction(data: any) {
    this.triggerSubject.next(data);
  }
}
