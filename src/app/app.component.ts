import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';

import { LoginComponent } from './login/login.component';
import { ServerConnector } from './server-connector/server-connector';
import { ServerConnectorConfig } from './server-connector/server-connector-config';
import { SubjectsService } from './subjects/subjects.service';
import { Message } from './messages/message';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, MatButtonModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatIconModule, RouterLink, RouterModule, // LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  navItems?: NavigationItem[];

  private _mobileQueryListener: () => void;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly serverConnector: ServerConnector,
    private readonly subjectsService: SubjectsService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.navItems = [
      { text: 'Log in', link: 'login' },
      { text: 'Log out', link: 'logout' },
      { text: 'Groups', link: 'device-groups' },
    ];
    this.subjectsService.getSendMessageObservable().subscribe(msg => this.onSendMessage(msg));

    const serverConnectorConfig: ServerConnectorConfig = {
      reconnectDelay: 1000,
      url: 'wss://localhost:65446',
    };
    this.serverConnector.setConnectedCallback(() => this.onConnectedToServer());
    this.serverConnector.setDataReceivedCallback(data => this.onServerDataReceived(data));
    this.serverConnector.setDisconnectedCallback(() => this.onServerDisconnected());
    this.serverConnector.setErrorCallback(error => this.onServerError(error));
    this.serverConnector.init(serverConnectorConfig);
    this.serverConnector.connect();
  }

  private onSendMessage(msg: Message): void {
    console.log('Sending message', msg);
    this.serverConnector.sendObject(msg);
  }

  private onConnectedToServer(): void {
    console.log('Server connected');
  }

  private onServerDataReceived(data: string): void {
    console.warn('Server data received', data);
  }

  private onServerDisconnected(): void {
    console.warn('Server disconnected');
  }

  private onServerError(error: any): void {
    console.warn('Server error', error);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

interface NavigationItem {
  text: string;
  link: string;
}
