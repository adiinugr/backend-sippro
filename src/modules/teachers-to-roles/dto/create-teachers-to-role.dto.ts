import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTeachersToRoleDto {
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
