import { Module } from '@nestjs/common';
import { UserController } from '../controller/auth.controller';
import { RegisterUserUseCase } from '../../application/auth/register/saveUser.usecase';
import { UserTypeOrmRepository } from '../../infrastructure/persistence/registerRepository/user.save.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/entities/userEntity';
import { DataSource } from 'typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { SendCodeRepository } from '../../infrastructure/persistence/registerRepository/send.code.repository';
import { VerifyCodeRepository } from '../../infrastructure/persistence/registerRepository/verify.code.repository';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CacheModule.register({
      ttl: 120,
      stores: redisStore,
      host: 'localhost',
      port: 6379,
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
    {
      provide: 'ICodeSenderRepository',
      useFactory: (dataSource: DataSource) =>
        new SendCodeRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: 'ISaveCodeRepository',
      useClass: VerifyCodeRepository,
    },
  ],
})
export class UserModule {}
