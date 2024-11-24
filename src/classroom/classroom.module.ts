import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';

import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService],
  imports: [DrizzleModule],
})
export class ClassroomModule {}
