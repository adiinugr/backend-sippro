import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { eq } from 'drizzle-orm';

// DTO
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

// Schema
import { achievements } from 'src/drizzle/schema/achievements.schema';

// Tyoes
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class AchievementService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createAchievementDto: CreateAchievementDto) {
    const createdAchievements = await this.db
      .insert(achievements)
      .values(createAchievementDto)
      .returning();
    return createdAchievements.pop();
  }

  async findAll() {
    const achievements = await this.db.query.achievements.findMany({});

    return achievements;
  }

  async findOne(id: number) {
    const achievement = await this.db.query.achievements.findFirst({
      where: (achievements, { eq }) => eq(achievements.id, id),
    });

    if (!achievement) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return achievement;
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto) {
    const updatedAchievements = await this.db
      .update(achievements)
      .set(updateAchievementDto)
      .where(eq(achievements.id, id))
      .returning();

    if (updatedAchievements.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedAchievements.pop();
  }

  async remove(id: number) {
    const deletedAchievement = await this.db
      .delete(achievements)
      .where(eq(achievements.id, id))
      .returning();

    if (deletedAchievement.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedAchievement.pop();
  }
}
