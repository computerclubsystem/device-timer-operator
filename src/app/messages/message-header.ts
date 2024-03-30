import { MessageType } from './message-type';

export interface MessageHeader {
  type: MessageType;
  corellationId?: string;
  roundTripData?: Record<string, string>;
}
