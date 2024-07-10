import { Component, inject } from '@angular/core';
import { MainService } from '../services/main.service';
import { NotificationService } from '../services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.scss',
})
export class ManagerDashboardComponent {
  messages = [];
  mainService: MainService = inject(MainService);
  notificationService: NotificationService = inject(NotificationService);
  constructor() {
    this.mainService.http
      .get(
        'https://remoteserviceprovider-1fa6b-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe({
        next: (value) => {
          this.messages.push(value);
          console.log(this.messages);
        },
        error: (err) => {
          this.notificationService.showNotification('خطایی رخ داد!');
        },
      });
  }
}
