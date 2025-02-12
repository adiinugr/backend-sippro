import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRolesToPermissionDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  permissionId: number;

  @IsBoolean()
  create: boolean;

  @IsBoolean()
  read: boolean;

  @IsBoolean()
  update: boolean;

  @IsBoolean()
  delete: boolean;
}
