import { Module } from '@nestjs/common';
import { PaysService } from './pays.service';
import { PaysController } from './pays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayEntity } from './entities/pay.entity';

@Module({
  controllers: [PaysController],
  providers: [PaysService],
  imports: [TypeOrmModule.forFeature([PayEntity])],
  exports: [PaysService],
})
export class PaysModule {}
