import { PartialType } from '@nestjs/mapped-types';
import { CreateAnorDto } from './create-anor.dto';

export class UpdateAnorDto extends PartialType(CreateAnorDto) {}
