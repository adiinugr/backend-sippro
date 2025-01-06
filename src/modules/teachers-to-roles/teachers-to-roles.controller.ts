import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { TeachersToRolesService } from './teachers-to-roles.service';
import { CreateTeachersToRoleDto } from './dto/create-teachers-to-role.dto';

@Controller('teachers-to-roles')
export class TeachersToRolesController {
  constructor(
    private readonly teachersToRolesService: TeachersToRolesService,
  ) {}

  @Post()
  create(@Body() createTeachersToRoleDto: CreateTeachersToRoleDto) {
    return this.teachersToRolesService.create(createTeachersToRoleDto);
  }

  @Delete(':teacherId/:roleId')
  remove(
    @Param('teacherId') teacherId: number,
    @Param('roleId') roleId: number,
  ) {
    return this.teachersToRolesService.remove(teacherId, roleId);
  }
}
