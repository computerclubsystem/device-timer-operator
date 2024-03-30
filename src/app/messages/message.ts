import { MessageHeader } from './message-header';

export interface Message {
  header: MessageHeader;
  body: any;
}
