import { Module } from '@nestjs/common';
import { TeachersToRolesService } from './teachers-to-roles.service';
import { TeachersToRolesController } from './teachers-to-roles.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [TeachersToRolesController],
  providers: [TeachersToRolesService],
  imports: [DrizzleModule],
})
export class TeachersToRolesModule {}
