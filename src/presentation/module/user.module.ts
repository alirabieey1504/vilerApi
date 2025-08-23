import { Module } from '@nestjs/common';
import { UserController } from '../controller/auth.controller';
import { RegisterUserUseCase } from '../../application/auth/register/saveUser.usecase';
import { UserTypeOrmRepository } from '../../infrastructure/persistence/registerRepository/user.save.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/entities/userEntity';
import { DataSource } from 'typeorm';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CacheModule.register({
      ttl: 120,
    }),
  ],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    {
      provide: 'IUserRepository',
      useFactory: (dataSource: DataSource) =>
        new UserTypeOrmRepository(dataSource),
      inject: [DataSource],
    },
  ],
})
export class UserModule {}
