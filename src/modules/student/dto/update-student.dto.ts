import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentDto {
  // Identity
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nis: string;

  @IsString()
  @IsNotEmpty()
  nisn: string;

  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
