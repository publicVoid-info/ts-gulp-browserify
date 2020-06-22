export class Student implements Person {
  constructor(
    public firstName: string,
    public middleName: string,
    public lastName: string
  ) {
    this.fullName = `${firstName} ${middleName} ${lastName}`;
  }
  public fullName: string;
}

export interface Person {
  firstName: string;
  lastName: string;
}
