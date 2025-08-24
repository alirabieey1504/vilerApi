// user.controller.ts
import { Controller, Body, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/auth/register/saveUser.usecase';
import { RegisterDto } from '../dto/registerdto';

@Controller('users')
export class UserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    console.log(body, 'this is obdy');
    const result = await this.registerUser.execute(
      body.phoneNumber,
      body.step,
      body.InputCode,
    );
    console.log(result, 'this is resuld3');
    return result;
  }
}
