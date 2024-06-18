import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoDirective } from '@jsverse/transloco';

import { SubjectsService } from './subjects/subjects.service';
import { Message } from './messages/message';
import { AppComponentSignals } from './declarations';
import { AppService } from './app.service';
import { ServerConnectorService } from './server-connector/server-connector.service';
import { ServerConnectorServiceConfig } from './server-connector/server-connector-config';
import { NotificationsService } from './shared/notifications/notifications.service';
import { TranslationsService } from './shared/translations/translations.service';
import { TranslationKey } from './shared/translations/declarations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet, MatButtonModule, MatMenuModule, MatToolbarModule, MatSnackBarModule,
    MatListModule, MatIconModule, RouterLink, RouterModule, TranslocoDirective,
  ],
})
export class AppComponent implements OnInit {
  signals: AppComponentSignals = this.appSvc.createSignals();

  constructor(
    private readonly serverConnectorSvc: ServerConnectorService,
    private readonly subjectsSvc: SubjectsService,
    private readonly appSvc: AppService,
    private readonly notificationsSvc: NotificationsService,
    private readonly translationsSvc: TranslationsService,
  ) {
  }

  ngOnInit(): void {
    this.subjectsSvc.getSendMessageObservable().subscribe(msg => this.onSendMessage(msg));

    const serverConnectorConfig: ServerConnectorServiceConfig = {
      reconnectDelay: 1000,
      url: this.appSvc.getServerWebSocketUrl(),
    };
    this.serverConnectorSvc.setConnectedCallback(() => this.onConnectedToServer());
    this.serverConnectorSvc.setDataReceivedCallback(data => this.onServerDataReceived(data));
    this.serverConnectorSvc.setDisconnectedCallback(() => this.onServerDisconnected());
    this.serverConnectorSvc.setErrorCallback(error => this.onServerError(error));
    this.serverConnectorSvc.init(serverConnectorConfig);
    this.serverConnectorSvc.connect();
  }

  private onSendMessage(msg: Message): void {
    console.log('Sending message', msg);
    this.serverConnectorSvc.sendObject(msg);
  }

  private onConnectedToServer(): void {
    this.notificationsSvc.showSuccess(this.translationsSvc.translate(TranslationKey.CONNECTED_TO_SERVER));
  }

  private onServerDataReceived(data: string): void {
    console.warn('Server data received', data);
    const msg = JSON.parse(data) as Message;
    this.subjectsSvc.getMessageReceivedSubject().next(msg);
  }

  private onServerDisconnected(): void {
    this.notificationsSvc.showWarn(this.translationsSvc.translate(TranslationKey.DISCONNECTED_FROM_SERVER));
  }

  private onServerError(error: any): void {
    this.notificationsSvc.showError(this.translationsSvc.translate(TranslationKey.SERVER_CONNECTION_ERROR));
  }
}

interface NavigationItem {
  text: string;
  link: string;
}
