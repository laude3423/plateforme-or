import { Module } from '@nestjs/common';
import { RegistreOrpailleurService } from './registre-orpailleur.service';
import { RegistreOrpailleurController } from './registre-orpailleur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistreOrpailleurEntity } from './entities/registre-orpailleur.entity';
import { OrpailleurEntity } from '../orpailleurs/entities/orpailleur.entity';
import { CollecteurEntity } from '../collecteurs/entities/collecteur.entity';
import { AgenceEntity } from '../agence/entities/agence.entity';

@Module({
  controllers: [RegistreOrpailleurController],
  providers: [RegistreOrpailleurService],
  imports: [
    TypeOrmModule.forFeature([
      RegistreOrpailleurEntity,
      OrpailleurEntity,
      CollecteurEntity,
      AgenceEntity,
    ]),
  ],
  exports: [RegistreOrpailleurService],
})
export class RegistreOrpailleurModule {}
