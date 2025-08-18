import { Module } from '@nestjs/common';
import { UserController } from '../controller/auth.controller';
import { RegisterUserUseCase } from '../../application/auth/register/register-sendto-phone-user.usecase';
import { UserTypeOrmRepository } from '../../infrastructure/persistence/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/entities/userEntity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
  ],
})
export class UserModule {}
