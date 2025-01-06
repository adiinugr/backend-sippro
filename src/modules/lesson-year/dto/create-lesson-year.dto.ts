import { IsNotEmpty, IsString } from 'class-validator';
import { lessonYears } from 'src/drizzle/schema/lessonYears.schema';
import { isUnique } from 'src/utils/validators';

export class CreateLessonYearDto {
  @IsString()
  @IsNotEmpty()
  @isUnique(
    { tableName: lessonYears, column: lessonYears.name },
    {
      message: 'Data sudah terdaftar!',
    },
  )
  name: string;
}
