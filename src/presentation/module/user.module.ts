import { Module } from '@nestjs/common';
import { UserController } from '../controller/auth.controller';
import { RegisterUserUseCase } from '../../application/auth/register/register-sendto-phone-user.usecase';
import { UserTypeOrmRepository } from '../../infrastructure/persistence/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/entities/userEntity';
import { DataSource } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
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
