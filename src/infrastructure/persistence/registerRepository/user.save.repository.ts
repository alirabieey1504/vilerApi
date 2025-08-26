/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
// infrastructure/repositories/UserTypeOrmRepository.ts
import { DataSource } from 'typeorm';
import { UserEntity } from '../../entities/userEntity';
import { IUserRepository } from '../../../domin/user/interfaces/IUser.repository.interface';
import { User } from '../../../domin/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async save(user: User): Promise<object> {
    const repo = this.dataSource.getRepository(UserEntity);
    const existingUser = await repo.findOne({
      where: { phoneNumber: user.phoneNumber },
    });

    const exit = !!existingUser;
    if (exit) {
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
      return {
        message: 'کاربر با موفقیت ساخته شد',
      };
    }
  }
}
