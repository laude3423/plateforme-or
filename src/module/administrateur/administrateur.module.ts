import { Module } from '@nestjs/common';
import { AdministrateurService } from './administrateur.service';
import { AdministrateurController } from './administrateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompteEntity } from '../compte/entities/compte.entity';
import { AdministrateurEntity } from './entities/administrateur.entity';

@Module({
  controllers: [AdministrateurController],
  providers: [AdministrateurService],
  imports: [TypeOrmModule.forFeature([AdministrateurEntity, CompteEntity])],
  exports: [AdministrateurService],
})
export class AdministrateurModule {}
