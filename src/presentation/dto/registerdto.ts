import { IsString } from 'class-validator';
export class RegisterDto {
  @IsString()
  phoneNumber!: string;
}
