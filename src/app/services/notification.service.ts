import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notify: MatSnackBar) {}
  showNotification(message: string) {
    this.notify.open(message, 'بستن', {
      duration: 4000,
    });
  }
}
