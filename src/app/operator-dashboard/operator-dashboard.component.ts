import { Component, inject } from '@angular/core';
import { MainService } from '../services/main.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../services/notification.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-operator-dashboard',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,RouterModule],
  templateUrl: './operator-dashboard.component.html',
  styleUrl: './operator-dashboard.component.scss',
})
export class OperatorDashboardComponent {
  showProfile: boolean = false;
  showIncreaseAccountBalancePage: boolean = false;
  mainService: MainService = inject(MainService);
  notificationService: NotificationService = inject(NotificationService);
  deleteAccount() {
    this.mainService.deleteOperator();
    this.notificationService.showNotification('حذف شد!');
  }
  increaseAccountBalance(amount: number) {
    this.mainService.allOperators[
      this.mainService.indexOfLoggedInOperator
    ].accountBalance += amount;
  }
  getProduct(description: string) {
    this.mainService.notificationService.showNotification('سفارش دریافت شد!');
    this.mainService.getProduct(description);
  }
}
