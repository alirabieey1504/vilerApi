import { User } from './user.entity';

export interface IUserRepository {
  // findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  validation();
}
