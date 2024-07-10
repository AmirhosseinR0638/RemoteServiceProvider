import { Component, inject, Input, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Product } from '../services/models/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  showForm: boolean = false;
  showProfile: boolean = false;
  productForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    startedDate: new FormControl('', Validators.required),
    finishedDate: new FormControl('', Validators.required),
  });
  userProducts: Product[] = [];
  mainService: MainService = inject(MainService);
  notificationService: NotificationService = inject(NotificationService);
  insertProduct() {
    let product = new Product(
      this.mainService.idMaker('prd'),
      this.productForm.value.description,
      this.mainService.allUsers[this.mainService.indexOfLoggedInUser].userName,
      '',
      this.productForm.value.price,
      this.productForm.value.startedDate,
      this.productForm.value.finishedDate,
      70
    );
    this.showForm = false;
    this.productForm.reset();
    let result = this.mainService.orderProduct(
      product.description,
      this.mainService.allUsers[this.mainService.indexOfLoggedInUser].userName,
      product.price,
      product.startedDate,
      product.finishedDate,
      70
    );
    if (result) {
      this.userProducts.push(product);
      this.notificationService.showNotification('انجام شد!');
    } else {
      this.notificationService.showNotification('موجودی کافی نمی باشد!');
    }
  }
  deleteProduct(index: number) {
    let product = this.mainService.allProducts.find((product) => {
      return product.description == this.userProducts[index].description;
    });
    this.userProducts.splice(index, 1);
    this.mainService.cancelProduct(product.description);
    this.notificationService.showNotification('حذف شد!');
  }
  deleteAccount() {
    this.userProducts = [];
    this.mainService.deleteUser();
    this.notificationService.showNotification('حذف شد!');
  }
  showIncreaseAccountBalancePage: boolean = false;
  increaseAccountBalance(amount: number) {
    this.mainService.increaseAccountBalance(amount);
    this.notificationService.showNotification('انجام شد!');
  }
  sendMessageToManager(message: string) {
    this.mainService.sendMessageToManager(message);
    this.showMessageForm = false;
  }
  showMessageForm: boolean = false;
  changeVisibilityMessageBox() {
    this.showMessageForm = !this.showMessageForm;
  }
  ngOnInit() {
    this.userProducts = this.mainService.allProducts.filter((p) => {
      return (
        p.userName ==
        this.mainService.allUsers[this.mainService.indexOfLoggedInUser].userName
      );
    });
  }
}
