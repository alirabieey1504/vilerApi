//منطق ثبت نام کاربر
import { IUserRepository } from '../../../domin/user/user.repository.interface';
import { User } from '../../../domin/user/user.entity';
import { v4 as uuid } from 'uuid';

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {
    const userid: string = uuid();
    console.log(userid);
  }

  async execute(
    id: string,

    phoneNumber: string,
    kodmeli: number,
    birth: string,
  ): Promise<User> {
    // const emailVO = new Email(email);
    // const existingUser = await this.userRepo.findByEmail(emailVO.getValue());
    // if (existingUser) throw new Error('Email already in use');

    const user = new User(id, phoneNumber, kodmeli, birth);
    await this.userRepo.save(user);

    return user;
  }
}
