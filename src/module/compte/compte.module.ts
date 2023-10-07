import { Module } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CompteController } from './compte.controller';
import { CompteEntity } from './entities/compte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CompteController],
  providers: [CompteService],
  imports: [TypeOrmModule.forFeature([CompteEntity])],
  exports: [CompteService],
})
export class CompteModule {}
