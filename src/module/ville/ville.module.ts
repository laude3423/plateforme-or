import { Module } from '@nestjs/common';
import { RegionModule } from './region/region.module';
import { CommuneModule } from './commune/commune.module';
import { DistrictModule } from './district/district.module';
import { ProvinceModule } from './province/province.module';

@Module({
  imports: [RegionModule, CommuneModule, DistrictModule, ProvinceModule]
})
export class VilleModule {}
