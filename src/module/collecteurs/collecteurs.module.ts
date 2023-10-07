import { Module } from '@nestjs/common';
import { CollecteursService } from './collecteurs.service';
import { CollecteursController } from './collecteurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollecteurEntity } from './entities/collecteur.entity';
import { CommuneEntity } from '../ville/commune/entities/commune.entity';

@Module({
  controllers: [CollecteursController],
  providers: [CollecteursService],
  imports: [TypeOrmModule.forFeature([CollecteurEntity, CommuneEntity])],
  exports: [CollecteursService],
})
export class CollecteursModule {}
