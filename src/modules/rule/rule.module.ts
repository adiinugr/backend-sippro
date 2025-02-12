import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [RuleController],
  providers: [RuleService],
  imports: [DrizzleModule],
})
export class RuleModule {}
