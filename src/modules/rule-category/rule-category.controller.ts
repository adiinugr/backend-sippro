import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RuleCategoryService } from './rule-category.service';
import { CreateRuleCategoryDto } from './dto/create-rule-category.dto';
import { UpdateRuleCategoryDto } from './dto/update-rule-category.dto';

@Controller('rule-category')
export class RuleCategoryController {
  constructor(private readonly ruleCategoryService: RuleCategoryService) {}

  @Post()
  create(@Body() createRuleCategoryDto: CreateRuleCategoryDto) {
    return this.ruleCategoryService.create(createRuleCategoryDto);
  }

  @Get()
  findAll() {
    return this.ruleCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruleCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRuleCategoryDto: UpdateRuleCategoryDto,
  ) {
    return this.ruleCategoryService.update(+id, updateRuleCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruleCategoryService.remove(+id);
  }
}
