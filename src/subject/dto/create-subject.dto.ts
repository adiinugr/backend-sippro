import { IsNotEmpty, IsString } from 'class-validator';
import { subjects } from 'src/drizzle/schema/subjects.schema';
import { isUnique } from 'src/utils/validators';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @isUnique(
    { tableName: subjects, column: subjects.code },
    {
      message: 'Kode sudah digunakan!',
    },
  )
  code: string;

  @IsString()
  @IsNotEmpty()
  @isUnique(
    { tableName: subjects, column: subjects.name },
    {
      message: 'Nama sudah digunakan!',
    },
  )
  name: 'string';
}
