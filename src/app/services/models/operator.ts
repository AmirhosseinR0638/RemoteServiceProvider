export class Operator {
  ID: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  phoneNumber: string;
  accountBalance: number;
  city: string;
  averageScore: number;
  constructor(
    ID: string = 'تعیین نشده',
    firstName: string = 'تعیین نشده',
    lastName: string = 'تعیین نشده',
    userName: string = 'تعیین نشده',
    password: string = 'تعیین نشده',
    phoneNumber: string = 'تعیین نشده',
    city: string = 'تعیین نشده',
    accountBalance: number = 0
  ) {
    this.ID = ID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.accountBalance = accountBalance;
  }
}
