import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private readonly sendMessageSubject = new Subject<any>();
  private readonly sendMessageObservable = this.sendMessageSubject.asObservable();

  getSendMessageSubject(): Subject<any> {
    return this.sendMessageSubject;
  }

  getSendMessageObservable(): Observable<any> {
    return this.sendMessageObservable;
  };
}
