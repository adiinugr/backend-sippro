import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectsToSubjectGroupService } from './subjects-to-subject-group.service';
import { CreateSubjectsToSubjectGroupDto } from './dto/create-subjects-to-subject-group.dto';
import { UpdateSubjectsToSubjectGroupDto } from './dto/update-subjects-to-subject-group.dto';

@Controller('subjects-to-subject-group')
export class SubjectsToSubjectGroupController {
  constructor(
    private readonly subjectsToSubjectGroupService: SubjectsToSubjectGroupService,
  ) {}

  @Post()
  create(
    @Body() createSubjectsToSubjectGroupDto: CreateSubjectsToSubjectGroupDto,
  ) {
    return this.subjectsToSubjectGroupService.create(
      createSubjectsToSubjectGroupDto,
    );
  }

  @Get()
  findAll() {
    return this.subjectsToSubjectGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsToSubjectGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubjectsToSubjectGroupDto: UpdateSubjectsToSubjectGroupDto,
  ) {
    return this.subjectsToSubjectGroupService.update(
      +id,
      updateSubjectsToSubjectGroupDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsToSubjectGroupService.remove(+id);
  }
}
