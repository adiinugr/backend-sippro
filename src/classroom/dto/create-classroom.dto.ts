import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { classrooms } from 'src/drizzle/schema/classrooms.schema';
import { isUnique } from 'src/utils/validators';

export class CreateClassroomDto {
  @IsString()
  @IsNotEmpty()
  @isUnique({ tableName: classrooms, column: classrooms.name })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  gradeId: number;
}
