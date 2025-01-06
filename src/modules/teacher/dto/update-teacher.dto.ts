import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeacherDto {
  // Identity
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
