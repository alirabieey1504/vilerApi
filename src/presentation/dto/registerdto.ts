import { IsNumber, IsString } from 'class-validator';
export class RegisterDto {
  @IsString()
  phoneNumber!: string;
  @IsNumber()
  step: number = 1;
}
