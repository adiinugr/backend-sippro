import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: 'string';
}
