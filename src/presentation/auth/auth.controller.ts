//گرفتن درخواست و پاس دادن به use case
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/user/register-user.usecase';
import { UserRepository } from '../../infrastructure/user/user.repository';

@Controller('users')
export class UserController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor() {
    const repo = new UserRepository();
    this.registerUserUseCase = new RegisterUserUseCase(repo);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const user = await this.registerUserUseCase.execute(
      body.email,
      body.password,
    );
    return { id: user.id, email: user.email };
  }
}
