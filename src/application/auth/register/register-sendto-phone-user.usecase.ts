//منطق ثبت نام کاربر
import type { IUserRepository } from '../../../domin/user/user.repository.interface';
import { User, UserRole } from '../../../domin/user/user.entity';
import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(phoneNumber: string): Promise<object> {
    const id: string = uuidv4();

    const user = new User(id, phoneNumber, UserRole.PASSENGER);
    console.log(user, 'this is my user');
    const result = await this.userRepo.save(user);
    await this.userRepo.sendToSms(phoneNumber);
    return result;
  }
}
