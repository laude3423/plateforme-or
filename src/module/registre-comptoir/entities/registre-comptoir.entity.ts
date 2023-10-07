import { AnorEntity } from 'src/module/anor/entities/anor.entity';
import { ComptoirEntity } from 'src/module/comptoir/entities/comptoir.entity';
import { PayEntity } from 'src/module/pays/entities/pay.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('registreComptoir')
export class RegistreComptoirEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: Date;

  @Column()
  quantite: number;

  @Column()
  prix: number;

  @ManyToOne(() => PayEntity, (pays) => pays.registreComptoirs)
  @JoinColumn({ name: 'paysId', referencedColumnName: 'id' })
  pays: PayEntity;

  @ManyToOne(() => ComptoirEntity, (comptoir) => comptoir.registreComptoirs)
  @JoinColumn({ name: 'comptoirId', referencedColumnName: 'id' })
  comptoir: ComptoirEntity;

  @ManyToOne(() => AnorEntity, (anor) => anor.registreComptoirs)
  @JoinColumn({ name: 'anorId', referencedColumnName: 'id' })
  anor: AnorEntity;
}
