import { Module } from '@nestjs/common';
import { UserController } from '../controller/auth.controller';
import { RegisterUserUseCase } from '../../application/auth/register/saveUser.usecase';
import { UserTypeOrmRepository } from '../../infrastructure/persistence/registerRepository/user.save.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/entities/userEntity';
import { DataSource } from 'typeorm';
import { SendCodeRepository } from '../../infrastructure/persistence/registerRepository/send.code.repository';
import { VerifyCodeRepository } from '../../infrastructure/persistence/registerRepository/verify.code.repository';
import Redis from 'ioredis';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: () => ({
    //     store: redisStore,
    //     host: 'localhost',
    //     port: 6379,
    //     ttl: 120,
    //   }),
    // }),
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
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const client = new Redis({
          host: '127.0.0.1',
          port: 6379,
        });
        client.on('connect', () => console.log('connected'));
        client.on('eeror', (err) => console.error('redis error', err));
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class UserModule {}
