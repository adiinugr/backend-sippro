import { Module } from '@nestjs/common';
import { SubjectGroupService } from './subject-group.service';
import { SubjectGroupController } from './subject-group.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [SubjectGroupController],
  providers: [SubjectGroupService],
  imports: [DrizzleModule],
})
export class SubjectGroupModule {}
