import { PartialType } from '@nestjs/mapped-types';
import { CreateComptoirDto } from './create-comptoir.dto';

export class UpdateComptoirDto extends PartialType(CreateComptoirDto) {}
