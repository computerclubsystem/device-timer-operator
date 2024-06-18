import { Message } from "./message";
import { MessageHeader } from "./message-header";
import { OperatorMessageType } from "./message-type";

export interface AuthMessageReplyHeader extends MessageHeader {
  type: OperatorMessageType.authReply;
}

export interface AuthMessageReplyBody {
  version: string;
}

export interface AuthMessageReply extends Message {
  header: AuthMessageReplyHeader,
  body: AuthMessageReplyBody,
}
