import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [AchievementController],
  providers: [AchievementService],
  imports: [DrizzleModule],
})
export class AchievementModule {}
