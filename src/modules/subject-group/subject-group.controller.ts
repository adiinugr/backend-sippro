import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectGroupService } from './subject-group.service';
import { CreateSubjectGroupDto } from './dto/create-subject-group.dto';
import { UpdateSubjectGroupDto } from './dto/update-subject-group.dto';

@Controller('subject-group')
export class SubjectGroupController {
  constructor(private readonly subjectGroupService: SubjectGroupService) {}

  @Post()
  create(@Body() createSubjectGroupDto: CreateSubjectGroupDto) {
    return this.subjectGroupService.create(createSubjectGroupDto);
  }

  @Get()
  findAll() {
    return this.subjectGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectGroupDto: UpdateSubjectGroupDto) {
    return this.subjectGroupService.update(+id, updateSubjectGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectGroupService.remove(+id);
  }
}
