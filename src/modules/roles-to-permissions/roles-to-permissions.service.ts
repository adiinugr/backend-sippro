import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolesToPermissionDto } from './dto/create-roles-to-permission.dto';
import { UpdateRolesToPermissionDto } from './dto/update-roles-to-permission.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { Inject } from '@nestjs/common';

// schema
import { rolesToPermissions } from 'src/drizzle/schema/roles.schema';
import { and } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

@Injectable()
export class RolesToPermissionsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createRolesToPermissionDto: CreateRolesToPermissionDto) {
    const createdRolesToPermission = await this.db
      .insert(rolesToPermissions)
      .values(createRolesToPermissionDto)
      .returning();
    return createdRolesToPermission.pop();
  }

  async findAll() {
    return await this.db.query.rolesToPermissions.findMany({
      with: {
        roles: true,
        permissions: true,
      },
    });
  }

  async findOne(id: number) {
    const rolesToPermission = await this.db.query.rolesToPermissions.findFirst({
      where: eq(rolesToPermissions.id, id),
      with: {
        roles: true,
        permissions: true,
      },
    });

    if (!rolesToPermission) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return rolesToPermission;
  }

  async update(
    id: number,
    updateRolesToPermissionDto: UpdateRolesToPermissionDto,
  ) {
    const updatedRolesToPermission = await this.db
      .update(rolesToPermissions)
      .set(updateRolesToPermissionDto)
      .where(eq(rolesToPermissions.id, id))
      .returning();

    if (updatedRolesToPermission.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedRolesToPermission.pop();
  }

  async remove(roleId: number) {
    const deletedRolesToPermission = await this.db
      .delete(rolesToPermissions)
      .where(and(eq(rolesToPermissions.roleId, roleId)))
      .returning();

    if (deletedRolesToPermission.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedRolesToPermission.pop();
  }
}
