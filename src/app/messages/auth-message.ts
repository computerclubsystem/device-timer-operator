import { Message } from './message';
import { MessageHeader } from './message-header';
import { MessageType } from './message-type';

// Request
export interface AuthMessageRequestHeader extends MessageHeader {
  type: MessageType.authRequest;
}

export interface AuthMessageRequestBody {
  username: string,
  password: string,
}

export interface AuthMessageRequest extends Message {
  header: AuthMessageRequestHeader,
  body: AuthMessageRequestBody,
}

// Reply
export interface AuthMessageReplyHeader extends MessageHeader {
  type: MessageType.authReply;
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
