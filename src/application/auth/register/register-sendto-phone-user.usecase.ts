//منطق ثبت نام کاربر
import { IUserRepository } from '../../../domin/user/user.repository.interface';
import { User, UserRole } from '../../../domin/user/user.entity';

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(phoneNumber: string): Promise<User> {
    const id = 1;
    console.log(id, 'this is my id custom');

    const user = new User(id, phoneNumber, UserRole.PASSENGER);
    await this.userRepo.save(user);

    return user;
  }
}
