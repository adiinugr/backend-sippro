import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonYearService } from './lesson-year.service';
import { CreateLessonYearDto } from './dto/create-lesson-year.dto';
import { UpdateLessonYearDto } from './dto/update-lesson-year.dto';

@Controller('lesson-year')
export class LessonYearController {
  constructor(private readonly lessonYearService: LessonYearService) {}

  @Post()
  create(@Body() createLessonYearDto: CreateLessonYearDto) {
    return this.lessonYearService.create(createLessonYearDto);
  }

  @Get()
  findAll() {
    return this.lessonYearService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonYearService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonYearDto: UpdateLessonYearDto) {
    return this.lessonYearService.update(+id, updateLessonYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonYearService.remove(+id);
  }
}
