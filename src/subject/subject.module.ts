import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
  imports: [DrizzleModule],
})
export class SubjectModule {}
