//منطق ثبت نام کاربر
import { IUserRepository } from '../../../domin/user/user.repository.interface';
import { User, UserRole } from '../../../domin/user/user.entity';
import { v4 as uuid } from 'uuid';

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {
    const userid: string = uuid();
    console.log(userid);
  }

  async execute(
    id: string,
    phoneNumber: string,
    Role: UserRole,
  ): Promise<User> {
    const user = new User(id, phoneNumber, Role);
    await this.userRepo.save(user);

    return user;
  }
}
