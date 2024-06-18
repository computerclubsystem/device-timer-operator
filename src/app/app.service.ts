import { Injectable, signal } from '@angular/core';

import { AppComponentSignals } from './declarations';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  createSignals(): AppComponentSignals {
    const signals: AppComponentSignals = {
      isLoggedIn: signal(false),
    };
    return signals;
  }

  getServerWebSocketUrl(): string {
    const currentUrl = new URL(window.location.href);
    const wssUrl = new URL(currentUrl.origin);
    wssUrl.protocol = 'wss';
    // wssUrl.port = currentUrl.port;
    return wssUrl.href;
  }
}
