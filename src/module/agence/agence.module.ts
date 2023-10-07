import { Module } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { AgenceController } from './agence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgenceEntity } from './entities/agence.entity';
import { CommuneEntity } from '../ville/commune/entities/commune.entity';
import { CompteEntity } from '../compte/entities/compte.entity';

@Module({
  controllers: [AgenceController],
  providers: [AgenceService],
  imports: [
    TypeOrmModule.forFeature([AgenceEntity, CommuneEntity, CompteEntity]),
  ],
  exports: [AgenceService],
})
export class AgenceModule {}
