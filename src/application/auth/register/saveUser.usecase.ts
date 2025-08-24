//منطق ثبت نام کاربر
import { User, UserRole } from '../../../domin/user/entities/user.entity';
import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { IUserRepository } from '../../../domin/user/interfaces/IUser.repository.interface';
import type { ICodeSenderRepository } from 'src/domin/user/interfaces/ICodeSender.repository.interface';
import type { ISaveCodeRepository } from 'src/domin/user/interfaces/ISaveCode.repository.interface';
@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    @Inject('ICodeSenderRepository')
    private readonly CodeRepo: ICodeSenderRepository,
    @Inject('ISaveCodeRepository')
    private readonly SaveRepo: ISaveCodeRepository,
  ) {}

  async execute(
    phoneNumber: string,
    step: number,
    InputCode: number,
  ): Promise<object> {
    if (step == undefined) {
      return { message: 'please enter step', status: 404 };
    }

    const id: string = uuidv4();
    console.log(step, 'this is step');
    const randomCode = Math.random() * 1000000;
    const code = Number(String(randomCode).slice(0, 5));
    const user = new User(id, phoneNumber, UserRole.PASSENGER);

    console.log(user, 'this is my user');
    if (step == 1) {
      const result = await this.userRepo.save(user);
      const result2 = await this.CodeRepo.sendToSms(phoneNumber, code);
      console.log(result, 'this is resutl3');
      console.log(result2, 'this is result2');
      const result3 = await this.SaveRepo.saveCode(phoneNumber, code);
      console.log(result3);
      return {
        res: result,
        code: result2,
      };
    } else if (step == 2) {
      const test = await this.SaveRepo.verifyUser(phoneNumber, InputCode);
      return {
        message: 'this is step2',
        resutl: test,
      };
    } else {
      return {
        res: 'message',
        ref: 'sss',
      };
    }
  }
}
