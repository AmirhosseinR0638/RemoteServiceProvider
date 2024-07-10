import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MainService } from '../services/main.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  notificationService: NotificationService = inject(NotificationService);
  mainService: MainService = inject(MainService);
  formMode: string = 'logIn';
  formState: string = 'users';
  changFormState(state: any) {
    this.formState = state.value;
  }
  changFormMode(mode: any) {
    this.formMode = mode.value;
  }
  signUpUserForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    currentCity: new FormControl('', Validators.required),
  });
  logInUserForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  signUpOperatorForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    selectedCity: new FormControl('', Validators.required),
  });
  logInOperatorForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  logInManagerForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  signUpUser() {
    let userInfo = {
      firstName: this.signUpUserForm.value.firstName,
      lastName: this.signUpUserForm.value.lastName,
      userName: this.signUpUserForm.value.userName,
      password: this.signUpUserForm.value.password,
      phoneNumber: this.signUpUserForm.value.phoneNumber,
      currentCity: this.signUpUserForm.value.currentCity,
    };
    this.mainService.signUpUser(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.userName,
      userInfo.password,
      userInfo.phoneNumber,
      userInfo.currentCity
    );
  }
  logInUser() {
    let userInfo = {
      userName: this.logInUserForm.value.userName,
      password: this.logInUserForm.value.password,
    };
    let userIndex = this.mainService.allUsers.findIndex((user) => {
      return (
        user.userName == userInfo.userName && user.password == userInfo.password
      );
    });
    if (userIndex != -1) {
      this.mainService.router.navigateByUrl('userDashboard');
      this.mainService.indexOfLoggedInUser = userIndex;
      this.notificationService.showNotification('با موفقیت وارد شدید!');
    } else {
      this.notificationService.showNotification(
        'نام کاربری یا رمز عبور اشتباه است!'
      );
      this.logInUserForm.reset();
    }
  }
  signUpOperator() {
    let operatorInfo = {
      firstName: this.signUpOperatorForm.value.firstName,
      lastName: this.signUpOperatorForm.value.lastName,
      userName: this.signUpOperatorForm.value.userName,
      password: this.signUpOperatorForm.value.password,
      phoneNumber: this.signUpOperatorForm.value.phoneNumber,
      selectedCity: this.signUpOperatorForm.value.selectedCity,
    };
    this.mainService.signUpOperator(
      operatorInfo.firstName,
      operatorInfo.lastName,
      operatorInfo.userName,
      operatorInfo.password,
      operatorInfo.phoneNumber,
      operatorInfo.selectedCity,
      0
    );
  }
  logInOperator() {
    let operatorInfo = {
      userName: this.logInOperatorForm.value.userName,
      password: this.logInOperatorForm.value.password,
    };
    let operatorIndex = this.mainService.allOperators.findIndex((user) => {
      return (
        user.userName == operatorInfo.userName &&
        user.password == operatorInfo.password
      );
    });
    if (operatorIndex != -1) {
      this.mainService.indexOfLoggedInOperator = operatorIndex;
      this.mainService.router.navigateByUrl('operatorDashboard');
      this.notificationService.showNotification('با موفقیت وارد شدید!');
    } else {
      this.notificationService.showNotification(
        'نام کاربری یا رمز عبور اشتباه است!'
      );
    }
  }
  logInManager() {
    let managerInfo = {
      firsName: this.logInManagerForm.value.userName,
      password: this.logInManagerForm.value.password,
    };
    if (
      managerInfo.firsName != 'امیرحسین راستی' &&
      managerInfo.password != '123456'
    ) {
      this.notificationService.showNotification('نام کاربری یا رمز عبور اشتباه است!');
      return false;
    }
    this.mainService.router.navigateByUrl('managerDashboard');
    this.notificationService.showNotification('باموفقیت وارد شدید!');
    return true;
  }
}
