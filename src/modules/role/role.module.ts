import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [DrizzleModule],
})
export class RoleModule {}
