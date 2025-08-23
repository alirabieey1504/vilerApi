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

  // async findById(id: string): Promise<User | null> {
  //   const repo = this.dataSource.getRepository(UserEntity);
  //   const entity = await repo.findOneBy({ id });
  //   if (!entity) return null;

  //   return new User(entity.id, entity.phoneNumber, entity.role as any);
  // }
}
