import { IsNotEmpty, IsString } from 'class-validator';
import { isUnique } from 'src/utils/validators';

// Schema
import { ruleCategories } from 'src/drizzle/schema/ruleCategories.schema';

export class CreateRuleCategoryDto {
  @IsString()
  @IsNotEmpty()
  @isUnique(
    { tableName: ruleCategories, column: ruleCategories.name },
    {
      message: 'Data sudah terdaftar!',
    },
  )
  name: string;
}
