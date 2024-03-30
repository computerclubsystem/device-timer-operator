import { Injectable } from '@angular/core';

import { ServerConnectorConfig } from './server-connector-config';

@Injectable({
  providedIn: 'root'
})
export class ServerConnector {
  private state: ServerConnectorState = {} as ServerConnectorState;
  private connectedCallback?: () => void;
  private disconnectedCallback?: () => void;
  private dataReceivedCallback?: (data: string) => void;
  private errorCallback?: (error: any) => void;
  private scheduleConnectTimeoutHandle?: number;

  init(config: ServerConnectorConfig): void {
    this.state = {
      config,
    } as ServerConnectorState;
  }

  setConnectedCallback(callback: () => void): void {
    this.connectedCallback = callback;
  }

  setDataReceivedCallback(callback: (data: string) => void): void {
    this.dataReceivedCallback = callback;
  }

  setDisconnectedCallback(callback: () => void): void {
    this.disconnectedCallback = callback;
  }

  setErrorCallback(callback: (error: any) => void): void {
    this.errorCallback = callback;
  }

  connect(): void {
    try {
      this.closeSocket();
      this.state.ws = new WebSocket(this.state.config.url);
    } catch (e) {
      this.sheduleConnect();
      this.errorCallback?.(e);
      return;
    }
    this.state.ws.onopen = () => {
      this.connectedCallback?.();
    };
    this.state.ws.onclose = () => {
      this.sheduleConnect();
      this.disconnectedCallback?.();
    };
    this.state.ws.onerror = ev => {
      this.sheduleConnect();
      this.errorCallback?.(ev);
    };
    this.state.ws.onmessage = ev => {
      this.dataReceivedCallback?.(ev.data);
      console.log(ev);
    };
  }

  sendObject(obj: Record<string, any>): void {
    this.state.ws.send(JSON.stringify(obj));
  }

  private closeSocket(): void {
    try {
      if (this.state.ws) {
        const readyState = this.state.ws.readyState;
        if (readyState !== this.state.ws.CLOSED && readyState !== this.state.ws.CLOSING) {
          this.state.ws.close();
        }
      }
    } catch { }
  }

  private sheduleConnect(): void {
    if (this.scheduleConnectTimeoutHandle !== undefined) {
      window.clearTimeout(this.scheduleConnectTimeoutHandle);
    }
    this.scheduleConnectTimeoutHandle = window.setTimeout(() => this.connect(), this.state.config.reconnectDelay);
  }
}

interface ServerConnectorState {
  config: ServerConnectorConfig;
  ws: WebSocket;
}

