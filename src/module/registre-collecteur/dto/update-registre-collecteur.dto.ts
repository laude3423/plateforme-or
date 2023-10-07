import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistreCollecteurDto } from './create-registre-collecteur.dto';

export class UpdateRegistreCollecteurDto extends PartialType(CreateRegistreCollecteurDto) {}
