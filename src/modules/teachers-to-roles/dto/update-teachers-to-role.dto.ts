import { PartialType } from '@nestjs/mapped-types';
import { CreateTeachersToRoleDto } from './create-teachers-to-role.dto';

export class UpdateTeachersToRoleDto extends PartialType(
  CreateTeachersToRoleDto,
) {}
