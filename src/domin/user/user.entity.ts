export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
}
export class User {
  constructor(
    public readonly id: string,
    public readonly phoneNumber: string,
    public readonly Role: UserRole = UserRole.PASSENGER,
  ) {}
}
