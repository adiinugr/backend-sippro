import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesToPermissionsService } from './roles-to-permissions.service';
import { CreateRolesToPermissionDto } from './dto/create-roles-to-permission.dto';
import { UpdateRolesToPermissionDto } from './dto/update-roles-to-permission.dto';

@Controller('roles-to-permissions')
export class RolesToPermissionsController {
  constructor(
    private readonly rolesToPermissionsService: RolesToPermissionsService,
  ) {}

  @Post()
  create(@Body() createRolesToPermissionDto: CreateRolesToPermissionDto) {
    return this.rolesToPermissionsService.create(createRolesToPermissionDto);
  }

  @Get()
  findAll() {
    return this.rolesToPermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesToPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRolesToPermissionDto: UpdateRolesToPermissionDto,
  ) {
    return this.rolesToPermissionsService.update(
      +id,
      updateRolesToPermissionDto,
    );
  }

  @Delete(':roleId')
  remove(@Param('roleId') roleId: number) {
    return this.rolesToPermissionsService.remove(roleId);
  }
}
