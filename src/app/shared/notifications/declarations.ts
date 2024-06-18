export const enum NotificationType {
  success = 'success',
  warn = 'warn',
  error = 'error',
}

export interface NotificationsConfiguration {
  duration?: number;
}
