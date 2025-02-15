import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { roles } from 'src/drizzle/schema/roles.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class RoleService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createRoleDto: CreateRoleDto) {
    const createdRoles = await this.db
      .insert(roles)
      .values(createRoleDto)
      .returning();
    return createdRoles.pop();
  }

  async findAll() {
    const roles = await this.db.query.roles.findMany({
      with: {
        rolesToPermissions: {
          with: {
            permissions: true,
          },
        },
        teachersToRoles: {
          with: {
            teachers: {
              columns: {
                password: false,
              },
            },
          },
        },
      },
    });

    return roles;
  }

  async findOne(id: number) {
    const role = await this.db.query.roles.findFirst({
      where: (roles, { eq }) => eq(roles.id, id),
      with: {
        rolesToPermissions: {
          with: {
            permissions: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const getRoleById = await this.db.query.roles.findFirst({
      where: (roles, { eq }) => eq(roles.id, id),
    });

    if (getRoleById.name === updateRoleDto.name)
      return { id, name: getRoleById.name };

    const updatedRoles = await this.db
      .update(roles)
      .set(updateRoleDto)
      .where(eq(roles.id, id))
      .returning();

    if (updatedRoles.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedRoles.pop();
  }

  async remove(id: number) {
    const deletedRoles = await this.db
      .delete(roles)
      .where(eq(roles.id, id))
      .returning();

    if (deletedRoles.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedRoles.pop();
  }
}
