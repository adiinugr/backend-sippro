import { Inject, Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';

// Types
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class ClassroomService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createClassroomDto: CreateClassroomDto) {
    return 'This action adds a new classroom';
  }

  async findAll() {
    return await this.db.query.classrooms.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
