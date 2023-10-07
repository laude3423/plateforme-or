import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';
import { ProvinceEntity } from '../province/entities/province.entity';

@Module({
  controllers: [RegionController],
  providers: [RegionService],
  imports: [TypeOrmModule.forFeature([RegionEntity, ProvinceEntity])],
  exports: [RegionService],
})
export class RegionModule {}
