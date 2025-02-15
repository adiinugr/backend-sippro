import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from 'src/modules/auth/dto/resetPassword.dto';

import { eq } from 'drizzle-orm';
import { teachers } from 'src/drizzle/schema/teachers.schema';
import { students } from 'src/drizzle/schema/students.schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password, loginAs } = loginDto;

    const student = await this.db.query.students.findFirst({
      where: (students, { eq }) => eq(students.email, email),
    });

    const teacher = await this.db.query.teachers.findFirst({
      with: {
        teachersToRoles: {
          with: {
            roles: {
              with: {
                rolesToPermissions: {
                  with: {
                    permissions: true,
                  },
                },
              },
            },
          },
        },
      },
      where: (teachers, { eq }) => eq(teachers.email, email),
    });

    const user: any = loginAs === 'student' ? student : teacher;

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return {
      accessToken,
      id: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
      teachersToRoles: user.status === 'teacher' ? user.teachersToRoles : null,
    };
  }

  async resetStudentPassword(resetPasswordDto: ResetPasswordDto) {
    const { userId, password } = resetPasswordDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedPassword = await this.db
      .update(students)
      .set({ password: hashedPassword })
      .where(eq(students.id, userId))
      .returning();

    if (updatedPassword.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedPassword.pop();
  }

  async resetTeacherPassword(resetPasswordDto: ResetPasswordDto) {
    const { userId, password } = resetPasswordDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedPassword = await this.db
      .update(teachers)
      .set({ password: hashedPassword })
      .where(eq(teachers.id, userId))
      .returning();

    if (updatedPassword.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedPassword.pop();
  }
}
