// user.controller.ts
import { Controller, Get, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/auth/register/register-sendto-phone-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Get('register')
  register() {
    return { message: 'ok', status: 200 };
  }
}
