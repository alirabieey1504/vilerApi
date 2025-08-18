// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/userEntity';
import { UserModule } from './presentation/module/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
})
export class AppModule {}
