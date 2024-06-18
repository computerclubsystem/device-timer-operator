import { Injectable } from '@angular/core';

import { AuthMessageRequest, AuthMessageRequestBody } from './auth-message';
import { OperatorMessageType } from './message-type';

@Injectable({
  providedIn: 'root'
})
export class MessageCreatorService {
  createAuthMessageRequest(): AuthMessageRequest {
    const msg: AuthMessageRequest = {
      header: {
        type: OperatorMessageType.authRequest,
      },
      body: {} as AuthMessageRequestBody,
    };
    return msg;
  }
}
