import { Module } from '@nestjs/common';
import { RuleCategoryService } from './rule-category.service';
import { RuleCategoryController } from './rule-category.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [RuleCategoryController],
  providers: [RuleCategoryService],
  imports: [DrizzleModule],
})
export class RuleCategoryModule {}
