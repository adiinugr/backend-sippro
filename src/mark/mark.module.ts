import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [MarkController],
  providers: [MarkService],
  imports: [DrizzleModule],
})
export class MarkModule {}
