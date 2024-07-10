import { inject, Injectable } from '@angular/core';
import { User } from './models/user';
import { Product } from './models/product';
import { Operator } from './models/operator';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  http: HttpClient = inject(HttpClient);
  notificationService: NotificationService = inject(NotificationService);
  router: Router = inject(Router);
  idMaker(type: string) {
    //generate a random ID with 6 character for every selected type(user,product,operator)
    let ID = (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString();
    switch (type) {
      case 'user':
        return type + ID;
      case 'operator':
        return type + ID;
      default:
        return type + ID;
    }
  }
  allUsers: User[] = [
    new User(
      this.idMaker('user'),
      'علی',
      'رضایی',
      'علی رضایی',
      'Ali76412',
      '09343872264',
      'تهران'
    ),
    new User(
      this.idMaker('user'),
      'مهدیه',
      'عسگری',
      'مهدیه عسگری',
      'Mahdieh91476',
      '09478316471',
      'تبریز'
    ),
    new User(
      this.idMaker('user'),
      'محمد',
      'عنایتی',
      'محمد عنایتی',
      'Mohaammad65237',
      '09186541937',
      'همدان'
    ),
  ];
  allProducts: Product[] = [
    new Product(
      this.idMaker('prd'),
      'حمل مواد غذایی',
      'مهدیه عسگری',
      '',
      90000,
      '1403/04/18',
      '1404/04/18',
      70
    ),
    new Product(
      this.idMaker('prd'),
      'مترجم زبان عربی',
      'محمد عنایتی',
      '',
      60000,
      '1403/04/19',
      '1403/05/19',
      80
    ),
    new Product(
      this.idMaker('prd'),
      'تایپ 10 صفحه مقاله',
      'علی رضایی',
      '',
      80000,
      '1403/04/19',
      '1403/04/26',
      80
    ),
  ];
  allOperators: Operator[] = [
    new Operator(
      this.idMaker('opr'),
      'شهرام',
      'صالحی',
      'شهرام صالحی',
      'Shahram95367',
      '098125143851',
      'تهران',
      250000
    ),
    new Operator(
      this.idMaker('opr'),
      'ایلیا',
      'هاشمی',
      'ایلیا هاشمی',
      'Illa81283',
      '09486325198',
      'تبریز',
      250000
    ),
    new Operator(
      this.idMaker('opr'),
      'سارا',
      'میرزایی',
      'سارا میرزایی',
      'Mirzaii13467',
      '09761496373',
      'همدان',
      250000
    ),
  ];
  // follow methods defined for users
  indexOfLoggedInUser: number = -1;
  signUpUser(
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    phoneNumber: string,
    currentCity: string
  ) {
    let isUserAlreadySignedUp = this.allUsers.findIndex((user) => {
      return user.userName == userName;
    });
    if (isUserAlreadySignedUp != -1) {
      // user already signedUp
      this.notificationService.showNotification(
        'کاربری با این نام کاربری قبلا ثبت نام کرده است!'
      );
    } else {
      this.allUsers.push(
        new User(
          this.idMaker('usr'),
          firstName,
          lastName,
          userName,
          password,
          phoneNumber,
          currentCity
        )
      );
      this.indexOfLoggedInUser = this.allUsers.length - 1;
      this.router.navigateByUrl('userDashboard');
      this.notificationService.showNotification('با موفقیت ثبت نام شدید!');
    }
  }
  deleteUser() {
    this.allUsers.splice(this.indexOfLoggedInUser, 1);
    this.router.navigateByUrl('log-in');
    this.notificationService.showNotification('حساب حذف شد!');
  }
  increaseAccountBalance(amount: number) {
    this.allUsers[this.indexOfLoggedInUser].accountBalance += amount;
  }
  orderProduct(
    description: string,
    userName: string,
    price: number,
    startedDate: string,
    finishedDate: string,
    userSatisfaction: number
  ) {
    return this.addProduct(
      description,
      userName,
      price,
      startedDate,
      finishedDate,
      userSatisfaction
    );
  }
  cancelProduct(description: string) {
    this.removeProduct(description);
  }
  sendMessageToManager(message: string) {
    this.http
      .post(
        'https://remoteserviceprovider-1fa6b-default-rtdb.firebaseio.com/messages.json',
        {
          sender: this.allUsers[this.indexOfLoggedInUser].userName,
          message: message,
          date: new Date(),
        }
      )
      .subscribe({
        error: () => {
          this.notificationService.showNotification('خطایی رخ داد!');
        },
        complete: () => {
          this.notificationService.showNotification(
            'پیام شما با موفقیت ارسال شد!'
          );
        },
      });
  }
  // follow methods defined for products
  addProduct(
    description: string,
    userName: string,
    price: number,
    startedDate: string,
    finishedDate: string,
    userSatisfaction: number
  ) {
    // add users product to products array to show them to operators
    if (this.allUsers[this.indexOfLoggedInUser].accountBalance < price) {
      return false;
    }
    this.allUsers[this.indexOfLoggedInUser].accountBalance -= price;
    this.allProducts.push(
      new Product(
        this.idMaker('prd'),
        description,
        userName,
        '',
        price,
        startedDate,
        finishedDate,
        userSatisfaction
      )
    );
    return true;
  }
  getProduct(description: string) {
    // run when product got by an operator
    let productIndex = this.allProducts.findIndex((product) => {
      return product.description == description;
    });
    this.allProducts[productIndex].canCanceled = false;
    this.allProducts[productIndex].operatorName =
      this.allOperators[this.indexOfLoggedInOperator].userName;
    this.paySalary(+this.allProducts[productIndex].price);
  }
  removeProduct(description: string) {
    let productIndex = this.allProducts.findIndex((product) => {
      return product.description == description;
    });
    if (this.allProducts[productIndex].canCanceled) {
      this.allProducts.splice(productIndex, 1);
      return true;
    }
    return false;
  }
  //follow methods defined for operators
  indexOfLoggedInOperator: number = -1;
  signUpOperator(
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    phoneNumber: string,
    city: string,
    accountBalance: number
  ) {
    let isOperatorAlreadySignedUp = this.allOperators.findIndex((operator) => {
      return userName == operator.userName;
    });
    if (isOperatorAlreadySignedUp != -1) {
      // operator already signedUp
      this.notificationService.showNotification(
        'اپراتوری با این نام کاربری قبلا ثبت نام کرده است!'
      );
    } else {
      this.allOperators.push(
        new Operator(
          this.idMaker('opr'),
          firstName,
          lastName,
          userName,
          password,
          phoneNumber,
          city,
          accountBalance
        )
      );
      this.notificationService.showNotification('با موفقیت ثبت نام شدید!');
      this.router.navigateByUrl('operatorDashboard');
      this.indexOfLoggedInOperator = this.allOperators.length - 1;
    }
  }
  deleteOperator() {
    this.allOperators.splice(this.indexOfLoggedInOperator, 1);
    this.notificationService.showNotification('حساب حذف شد!');
    this.router.navigateByUrl('log-in');
  }
  returnAccountBalance() {
    return this.allOperators[this.indexOfLoggedInOperator].accountBalance;
  }
  paySalary(price: number) {
    //take salary
    this.allOperators[this.indexOfLoggedInOperator].accountBalance += price;
  }
  showProductInfo(ID: string) {
    let selectedProduct = this.allProducts.find((product) => {
      return product.ID == ID;
    });
    return selectedProduct;
  }
  selectCity() {}
  giveScoreToUser() {}
}
