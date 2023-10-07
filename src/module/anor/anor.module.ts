import { Module } from '@nestjs/common';
import { AnorService } from './anor.service';
import { AnorController } from './anor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnorEntity } from './entities/anor.entity';
import { CompteEntity } from '../compte/entities/compte.entity';

@Module({
  controllers: [AnorController],
  providers: [AnorService],
  imports: [TypeOrmModule.forFeature([AnorEntity, CompteEntity])],
  exports: [AnorService],
})
export class AnorModule {}
