import { Module } from '@nestjs/common';
import { ViolationService } from './violation.service';
import { ViolationController } from './violation.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ViolationController],
  providers: [ViolationService],
  imports: [DrizzleModule],
})
export class ViolationModule {}
