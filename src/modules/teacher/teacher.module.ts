import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [DrizzleModule],
})
export class TeacherModule {}
