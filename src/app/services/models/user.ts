export class User {
  ID: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  accountBalance: number = 0;
  phoneNumber: string;
  currentCity: string;
  constructor(
    ID: string = 'تعیین نشده',
    firstName: string = 'تعیین نشده',
    lastName: string = 'تعیین نشده',
    userName: string = 'تعیین نشده',
    password: string = 'تعیین نشده',
    phoneNumber: string = 'تعیین نشده',
    currentCity: string = 'تعیین نشده'
  ) {
    this.ID = ID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.currentCity = currentCity;
  }
}
