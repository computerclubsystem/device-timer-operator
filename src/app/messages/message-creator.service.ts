import { Injectable } from '@angular/core';

import { AuthMessageRequest, AuthMessageRequestBody } from './auth-message';
import { MessageType } from './message-type';

@Injectable({
  providedIn: 'root'
})
export class MessageCreatorService {
  createAuthMessageRequest(): AuthMessageRequest {
    const msg: AuthMessageRequest = {
      header: {
        type: MessageType.authRequest,
      },
      body: {} as AuthMessageRequestBody,
    };
    return msg;
  }
}
