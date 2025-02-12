import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { eq } from 'drizzle-orm';

// Schema
import { permissions } from 'src/drizzle/schema/permissions.schema';

@Injectable()
export class PermissionService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const createPermission = await this.db
      .insert(permissions)
      .values(createPermissionDto)
      .returning();
    return createPermission.pop();
  }

  async findAll() {
    const permissions = await this.db.query.permissions.findMany({
      with: {
        rolesToPermissions: {
          with: {
            roles: true,
          },
        },
      },
    });
    return permissions;
  }

  async findOne(id: number) {
    const permission = await this.db.query.permissions.findFirst({
      where: (permissions, { eq }) => eq(permissions.id, id),
    });

    if (!permission) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const updatedPermission = await this.db
      .update(permissions)
      .set(updatePermissionDto)
      .where(eq(permissions.id, id))
      .returning();

    if (!updatedPermission) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedPermission.pop();
  }

  async remove(id: number) {
    const deletedPermission = await this.db
      .delete(permissions)
      .where(eq(permissions.id, id))
      .returning();

    if (!deletedPermission) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedPermission.pop();
  }
}
