import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { teachers } from 'src/drizzle/schema/teachers.schema';
import { isUnique } from 'src/utils/validators';

export class CreateTeacherDto {
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
  @isUnique({ tableName: teachers, column: teachers.email })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
