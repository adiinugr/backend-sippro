import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

// Module
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    DrizzleModule,
    ClassroomModule,
    StudentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
