import { OperatorMessageType } from './message-type';

export interface MessageHeader {
  type: OperatorMessageType;
  corellationId?: string;
  roundTripData?: Record<string, string>;
}
