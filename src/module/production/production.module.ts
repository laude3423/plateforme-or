import { Module } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionEntity } from './entities/production.entity';
import { OrpailleurEntity } from '../orpailleurs/entities/orpailleur.entity';

@Module({
  controllers: [ProductionController],
  providers: [ProductionService],
  imports: [TypeOrmModule.forFeature([ProductionEntity, OrpailleurEntity])],
  exports: [ProductionService],
})
export class ProductionModule {}
