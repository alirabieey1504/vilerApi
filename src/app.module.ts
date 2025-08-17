// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/userEntity';
import { UserController } from './presentation/auth/auth.controller';
import { RegisterUserUseCase } from './application/auth/register/register-sendto-phone-user.usecase';
import { UserTypeOrmRepository } from './infrastructure/persistence/user.repository';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
  ],
})
export class AppModule {}
