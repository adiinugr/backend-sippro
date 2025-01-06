import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
