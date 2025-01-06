import { IsNotEmpty, IsString } from 'class-validator';
import { roles } from 'src/drizzle/schema/roles.schema';
import { isUnique } from 'src/utils/validators';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @isUnique(
    { tableName: roles, column: roles.name },
    {
      message: 'Data sudah terdaftar!',
    },
  )
  name: string;
}
