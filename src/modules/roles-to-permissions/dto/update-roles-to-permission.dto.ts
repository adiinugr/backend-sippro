import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesToPermissionDto } from './create-roles-to-permission.dto';

export class UpdateRolesToPermissionDto extends PartialType(CreateRolesToPermissionDto) {}
