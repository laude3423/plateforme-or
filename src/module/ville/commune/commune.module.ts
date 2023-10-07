import { Module } from '@nestjs/common';
import { CommuneService } from './commune.service';
import { CommuneController } from './commune.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommuneEntity } from './entities/commune.entity';
import { DistrictEntity } from '../district/entities/district.entity';

@Module({
  controllers: [CommuneController],
  providers: [CommuneService],
  imports: [TypeOrmModule.forFeature([CommuneEntity, DistrictEntity])],
})
export class CommuneModule {}
