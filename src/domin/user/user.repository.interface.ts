import { User } from './user.entity';

export interface IUserRepository {
  // findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<object>;
  sendToSms(phone: string): Promise<void>;
}
