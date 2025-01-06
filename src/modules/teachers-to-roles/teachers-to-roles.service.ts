import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeachersToRoleDto } from './dto/create-teachers-to-role.dto';
import { teachersToRoles } from 'src/drizzle/schema/teachers.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class TeachersToRolesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createTeacherToRoles: CreateTeachersToRoleDto) {
    const createdTeacherToRole = await this.db
      .insert(teachersToRoles)
      .values(createTeacherToRoles)
      .returning();
    return createdTeacherToRole.pop();
  }

  async remove(teacherId: number, roleId: number) {
    const deletedTeacherToRole = await this.db
      .delete(teachersToRoles)
      .where(
        and(
          eq(teachersToRoles.teacherId, teacherId),
          eq(teachersToRoles.roleId, roleId),
        ),
      )
      .returning();

    if (deletedTeacherToRole.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedTeacherToRole.pop();
  }
}
