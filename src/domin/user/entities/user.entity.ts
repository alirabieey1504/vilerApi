import { randomUUID } from 'node:crypto';

export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
}
export class User {
  static emptyCode;
  private readonly id: string;
  public readonly role: UserRole = UserRole.PASSENGER;
  private readonly code: number;
  public readonly dateRegisterCode?: string;

  constructor(public readonly phoneNumber: string) {
    this.id = randomUUID();
    this.checkCode();
    User.emptyCode = Math.random() * 1000000;
    this.code = Number(String(User.emptyCode).slice(0, 5));
  }

  private checkCode() {
    if (String(this.code).length > 5 || String(this.code).length < 5) {
      throw new Error('pleas enter 5 count number');
    }
  }
  get GetID() {
    return this.id;
  }
  get GetCode() {
    return this.code;
  }
}
