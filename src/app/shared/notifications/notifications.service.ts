import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotificationType, NotificationsConfiguration } from './declarations';


@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private panelClassMap = this.createDefaultPanelClassMap();
  private configuration = this.createDefaultConfiguration();

  constructor(
    private readonly matSnackBar: MatSnackBar,
  ) { }

  showSuccess(message: string): void {
    this.show(message, NotificationType.success);
  }

  showWarn(message: string): void {
    this.show(message, NotificationType.warn);
  }

  showError(message: string): void {
    this.show(message, NotificationType.error);
  }

  show(message: string, notificationType: NotificationType): void {
    const panelClasses = this.getPanelClasses(notificationType);
    let configuration: MatSnackBarConfig = {
      ...this.configuration,
      panelClass: panelClasses,
    };
    this.matSnackBar.open(message, undefined, configuration);
  }

  setConfiguration(configuration: NotificationsConfiguration): void {
    this.configuration = configuration;
  }

  getConfiguration(): NotificationsConfiguration {
    return { ...this.configuration };
  }

  private createDefaultConfiguration(): NotificationsConfiguration {
    const configuration: NotificationsConfiguration = {
      duration: 8000,
    };
    return configuration;
  }

  private createDefaultPanelClassMap(): Map<NotificationType, string[]> {
    const panelClassMap = new Map<NotificationType, string[]>();
    panelClassMap.set(NotificationType.success, ['ccs3-dto-success-notification']);
    panelClassMap.set(NotificationType.warn, ['ccs3-dto-warn-notification']);
    panelClassMap.set(NotificationType.error, ['ccs3-dto-error-notification']);
    return panelClassMap;
  }

  private getPanelClasses(snackType: NotificationType): string[] {
    const mapItem = this.panelClassMap.get(snackType);
    return mapItem || [];
  }
}
