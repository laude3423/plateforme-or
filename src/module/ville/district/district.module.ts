import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictEntity } from './entities/district.entity';
import { RegionEntity } from '../region/entities/region.entity';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService],
  imports: [
    TypeOrmModule.forFeature([DistrictEntity]),
    TypeOrmModule.forFeature([RegionEntity]),
  ],
})
export class DistrictModule {}
