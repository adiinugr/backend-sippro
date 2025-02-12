import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  point: number;

  @IsNotEmpty()
  @IsNumber()
  ruleCategoryId: number;
}
