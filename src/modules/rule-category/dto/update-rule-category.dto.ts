import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleCategoryDto } from './create-rule-category.dto';

export class UpdateRuleCategoryDto extends PartialType(CreateRuleCategoryDto) {}
