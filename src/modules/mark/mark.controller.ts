import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Controller('mark')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Post()
  create(@Body() createMarkDto: CreateMarkDto) {
    return this.markService.create(createMarkDto);
  }

  @Get()
  findAll() {
    return this.markService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkDto: UpdateMarkDto) {
    return this.markService.update(+id, updateMarkDto);
  }

  @Delete(':studentId/:subjectGroupId')
  remove(
    @Param('studentId') studentId: number,
    @Param('subjectGroupId') subjectGroupId: number,
  ) {
    return this.markService.remove(studentId, subjectGroupId);
  }
}
