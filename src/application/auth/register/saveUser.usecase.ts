//منطق ثبت نام کاربر
import { User } from '../../../domin/user/entities/user.entity';
import { Injectable, Inject } from '@nestjs/common';
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

    const convertToNum = Number(InputCode);

    const user = new User(phoneNumber);

    if (step == 1) {
      const getTtl = await this.SaveRepo.getTtl(phoneNumber);
      if (getTtl == false) {
        const result = await this.userRepo.save(user);
        await this.SaveRepo.saveCode(phoneNumber, user.GetCode);
        await this.CodeRepo.sendToSms(phoneNumber, user.GetCode);
        return {
          res: result,
          status: 200,
        };
      } else
        return {
          message: 'please wait a moment',
          status: 404,
        };
    } else if (step == 2) {
      const test = await this.SaveRepo.verifyCode(phoneNumber, convertToNum);
      if (test)
        return {
          message: 'با موفقیت وارد شدید',
          status: 200,
          auth: true,
        };
      else
        return {
          message: 'کد وارد شده صحیح نمی باشد',
          status: 200,
          auth: false,
        };
    } else {
      return {
        message: 'please enter step',
        status: 404,
      };
    }
  }
}
