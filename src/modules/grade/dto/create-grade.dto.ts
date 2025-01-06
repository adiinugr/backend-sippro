import { IsNotEmpty, IsString } from 'class-validator';
import { grades } from 'src/drizzle/schema/grades.schema';
import { isUnique } from 'src/utils/validators';

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  @isUnique(
    { tableName: grades, column: grades.name },
    {
      message: 'Data sudah terdaftar!',
    },
  )
  name: string;
}
