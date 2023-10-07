import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { ProvinceEntity } from './entities/province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService],
  imports: [TypeOrmModule.forFeature([ProvinceEntity])],
  exports: [ProvinceService],
})
export class ProvinceModule {}
