//اتصال به دیتابیس typeorm prisma
import { IUserRepository } from '../../domain/user/user.repository.interface';
import { User } from '../../domain/user/user.entity';

export class UserRepository implements IUserRepository {
  private users: User[] = []; // شبیه دیتابیس ساده

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
