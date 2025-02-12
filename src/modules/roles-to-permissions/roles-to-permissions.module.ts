import { Module } from '@nestjs/common';
import { RolesToPermissionsService } from './roles-to-permissions.service';
import { RolesToPermissionsController } from './roles-to-permissions.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [RolesToPermissionsController],
  providers: [RolesToPermissionsService],
  imports: [DrizzleModule],
})
export class RolesToPermissionsModule {}
