import { Module } from '@nestjs/common';
import { OrpailleursService } from './orpailleurs.service';
import { OrpailleursController } from './orpailleurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrpailleurEntity } from './entities/orpailleur.entity';
import { CommuneEntity } from '../ville/commune/entities/commune.entity';

@Module({
  controllers: [OrpailleursController],
  providers: [OrpailleursService],
  imports: [TypeOrmModule.forFeature([OrpailleurEntity, CommuneEntity])],
  exports: [OrpailleursService],
})
export class OrpailleursModule {}
