import { PartialType } from '@nestjs/mapped-types';

import { CreateViolationDto } from './cretae-violation.dto';

export class UpdateViolationDto extends PartialType(CreateViolationDto) {}
