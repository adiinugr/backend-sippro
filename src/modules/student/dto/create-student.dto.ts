import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { students } from 'src/drizzle/schema/students.schema';
import { isUnique } from 'src/utils/validators';

export class CreateStudentDto {
  // Identity
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @isUnique({ tableName: students, column: students.nis })
  nis: string;

  @IsString()
  @IsNotEmpty()
  @isUnique({ tableName: students, column: students.nisn })
  nisn: string;

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
  @isUnique({ tableName: students, column: students.email })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
