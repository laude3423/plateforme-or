import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistreOrpailleurDto } from './create-registre-orpailleur.dto';

export class UpdateRegistreOrpailleurDto extends PartialType(CreateRegistreOrpailleurDto) {}
