import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistreComptoirDto } from './create-registre-comptoir.dto';

export class UpdateRegistreComptoirDto extends PartialType(CreateRegistreComptoirDto) {}
