import { Message } from './message';
import { MessageHeader } from './message-header';
import { OperatorMessageType } from './message-type';

// Request
export interface AuthMessageRequestHeader extends MessageHeader {
  type: OperatorMessageType.authRequest;
}

export interface AuthMessageRequestBody {
  username: string,
  passwordHash: string,
}

export interface AuthMessageRequest extends Message {
  header: AuthMessageRequestHeader,
  body: AuthMessageRequestBody,
}

// Reply
export interface AuthMessageReplyHeader extends MessageHeader {
  type: OperatorMessageType.authReply;
}

export interface AuthMessageReplyBody {
  success: boolean;
  error?: string;
  token?: string;
}

export interface AuthMessageReply extends Message {
  header: AuthMessageReplyHeader,
  body: AuthMessageReplyBody,
}
