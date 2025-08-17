// infrastructure/repositories/UserTypeOrmRepository.ts
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/userEntity';
import { IUserRepository } from '../../domin/user/user.repository.interface';
import { User } from '../../domin/user/user.entity';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async save(user: User): Promise<void> {
    const repo = this.dataSource.getRepository(UserEntity);
    console.log(repo);
    const entity = repo.create({
      id: user.id,
      phoneNumber: user.phoneNumber,
      role: user.Role,
    });
    await repo.save(entity);
  }

  // async findById(id: string): Promise<User | null> {
  //   const repo = this.dataSource.getRepository(UserEntity);
  //   const entity = await repo.findOneBy({ id });
  //   if (!entity) return null;

  //   return new User(entity.id, entity.phoneNumber, entity.role as any);
  // }
}
