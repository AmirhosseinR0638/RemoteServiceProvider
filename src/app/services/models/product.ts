export class Product {
  ID: string;
  userName: string;
  description: string;
  operatorName: string;
  price: number;
  startedDate: string;
  finishedDate: string;
  userSatisfaction: number;
  canCanceled: boolean = true;
  constructor(
    ID: string = 'تعیین نشده',
    description: string = 'تعیین نشده',
    userName: string = 'تعیین نشده',
    operatorName: string = 'تعیین نشده',
    price: number = 0,
    startedDate: string = 'تعیین نشده',
    finishedDate: string = 'تعیین نشده',
    userSatisfaction: number = 0
  ) {
    this.ID = ID;
    this.description = description;
    this.userName = userName;
    this.operatorName = operatorName;
    this.price = price;
    this.startedDate = startedDate;
    this.finishedDate = finishedDate;
    this.userSatisfaction = userSatisfaction;
  }
}
