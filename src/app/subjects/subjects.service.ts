import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Message } from '../messages/message';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private readonly sendMessageSubject = new Subject<any>();
  private readonly sendMessageObservable = this.sendMessageSubject.asObservable();
  private readonly messageReceivedSubject = new Subject<Message>();
  private readonly messageReceivedObservable = this.sendMessageSubject.asObservable();

  getMessageReceivedSubject(): Subject<Message> {
    return this.messageReceivedSubject;
  }

  getMessageReceivedObservable(): Observable<Message> {
    return this.messageReceivedObservable;
  }

  getSendMessageSubject(): Subject<any> {
    return this.sendMessageSubject;
  }

  getSendMessageObservable(): Observable<any> {
    return this.sendMessageObservable;
  };
}
