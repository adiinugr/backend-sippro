import { Module } from '@nestjs/common';
import { LessonYearService } from './lesson-year.service';
import { LessonYearController } from './lesson-year.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [LessonYearController],
  providers: [LessonYearService],
  imports: [DrizzleModule],
})
export class LessonYearModule {}
