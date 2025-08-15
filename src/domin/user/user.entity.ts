export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
}
export class User {
  constructor(
    public readonly id: string,
    public readonly phoneNumber: string,
    private readonly kodmeli: number,
    public readonly birth: string,
    public readonly Role: UserRole,
    // private password: string,
  ) {}
  // checkPassword(password: string): boolean {
  //   return this.password == password;
  // }
  // setPassword(password: string) {
  //   this.password = password;
  // }
}
