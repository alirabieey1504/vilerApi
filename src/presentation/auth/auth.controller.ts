// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/auth/register/register-sendto-phone-user.usecase';
import { UserRole } from '../../domin/user/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  async register(
    @Body() body: { id: string; phoneNumber: string; role: UserRole },
  ) {
    await this.registerUser.execute(body.id, body.phoneNumber, body.role);
    return { message: 'User registered successfully' };
  }
}
