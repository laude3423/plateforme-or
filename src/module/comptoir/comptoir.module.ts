import { Module } from '@nestjs/common';
import { ComptoirService } from './comptoir.service';
import { ComptoirController } from './comptoir.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComptoirEntity } from './entities/comptoir.entity';

@Module({
  controllers: [ComptoirController],
  providers: [ComptoirService],
  imports: [TypeOrmModule.forFeature([ComptoirEntity])],
  exports: [ComptoirService],
})
export class ComptoirModule {}
