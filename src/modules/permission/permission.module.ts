import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [DrizzleModule],
})
export class PermissionModule {}
