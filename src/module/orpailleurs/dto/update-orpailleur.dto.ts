import { PartialType } from '@nestjs/mapped-types';
import { CreateOrpailleurDto } from './create-orpailleur.dto';

export class UpdateOrpailleurDto extends PartialType(CreateOrpailleurDto) {}
