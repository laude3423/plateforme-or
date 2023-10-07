import { Module } from '@nestjs/common';
import { RegistreComptoirService } from './registre-comptoir.service';
import { RegistreComptoirController } from './registre-comptoir.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistreComptoirEntity } from './entities/registre-comptoir.entity';
import { ComptoirEntity } from '../comptoir/entities/comptoir.entity';
import { PayEntity } from '../pays/entities/pay.entity';
import { AnorEntity } from '../anor/entities/anor.entity';

@Module({
  controllers: [RegistreComptoirController],
  providers: [RegistreComptoirService],
  imports: [
    TypeOrmModule.forFeature([
      RegistreComptoirEntity,
      ComptoirEntity,
      PayEntity,
      AnorEntity,
    ]),
  ],
  exports: [RegistreComptoirService],
})
export class RegistreComptoirModule {}
