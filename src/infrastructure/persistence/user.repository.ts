/* eslint-disable @typescript-eslint/await-thenable */
// infrastructure/repositories/UserTypeOrmRepository.ts
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/userEntity';
import { IUserRepository } from '../../domin/user/user.repository.interface';
import { User } from '../../domin/user/user.entity';
import { Injectable } from '@nestjs/common';
import Kavenegar from 'kavenegar';

//   const kavenegar: any;
//   export default kavenegar;
// }
@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {}
  apiKey =
    '3045716F37754F496C707A486A344477734F6457694772664E587A7A5054764A733654384E4D71513271383D'; // کلید API خودت
  sender = '1000300030030';
  api = Kavenegar.KavenegarApi({ apikey: this.apiKey });
  async save(user: User): Promise<object> {
    console.log(user, 'this is user in repo');
    const repo = this.dataSource.getRepository(UserEntity);
    const existingUser = await repo.findOne({
      where: { phoneNumber: user.phoneNumber },
    });

    console.log(existingUser, 'thi is exxx3');
    const exit = !!existingUser;
    if (exit) {
      console.log(repo);
      console.log('کاربر وچود داشت');
      return {
        message: 'شماره شما از قبل وجود داشت ',
        user: user.phoneNumber,
      };
    } else {
      const entity = repo.create({
        id: user.id,
        phoneNumber: user.phoneNumber,
        role: user.role,
      });
      await repo.save(entity);
      console.log('کاربری یافت نشد');
      return {
        message: 'کاربر با موفقیت ساخته شد',
      };
    }
  }

  async sendToSms(phone: string, kode: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.api.Send(
        {
          sender: this.sender,
          receptor: phone,
          message: String(kode),
        },
        (response, status) => {
          console.log(status, 'this is status');

          if (status !== 200) {
            reject(new Error(`SMS API failed: ${status}`));
            return;
          }

          if (Array.isArray(response)) {
            resolve(response);
          } else {
            reject(new Error('Response is not an array'));
          }
        },
      );
    });
  }

  // async findById(id: string): Promise<User | null> {
  //   const repo = this.dataSource.getRepository(UserEntity);
  //   const entity = await repo.findOneBy({ id });
  //   if (!entity) return null;

  //   return new User(entity.id, entity.phoneNumber, entity.role as any);
  // }
}
