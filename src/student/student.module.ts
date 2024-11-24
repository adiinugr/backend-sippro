import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [DrizzleModule],
})
export class StudentModule {}
