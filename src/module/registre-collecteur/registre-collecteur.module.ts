import { Module } from '@nestjs/common';
import { RegistreCollecteurService } from './registre-collecteur.service';
import { RegistreCollecteurController } from './registre-collecteur.controller';
import { RegistreCollecteurEntity } from './entities/registre-collecteur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollecteurEntity } from '../collecteurs/entities/collecteur.entity';
import { ComptoirEntity } from '../comptoir/entities/comptoir.entity';
import { AgenceEntity } from '../agence/entities/agence.entity';

@Module({
  controllers: [RegistreCollecteurController],
  providers: [RegistreCollecteurService],
  imports: [
    TypeOrmModule.forFeature([
      RegistreCollecteurEntity,
      CollecteurEntity,
      ComptoirEntity,
      AgenceEntity,
    ]),
  ],
  exports: [RegistreCollecteurService],
})
export class RegistreCollecteurModule {}
