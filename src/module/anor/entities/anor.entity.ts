import { CompteEntity } from 'src/module/compte/entities/compte.entity';
import { RegistreComptoirEntity } from 'src/module/registre-comptoir/entities/registre-comptoir.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('anor')
export class AnorEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nomResponsable: string;

  @Column({ type: 'varchar', length: 50 })
  adresseResponsable: string;

  @Column({ type: 'varchar', length: 12 })
  cinResponsable: string;

  @Column({ type: 'varchar', length: 10 })
  contactResponsable: string;

  @ManyToOne(() => CompteEntity, (compte) => compte.anors)
  @JoinColumn({ name: 'compteId', referencedColumnName: 'id' }) // Specify the foreign key column name
  compte: CompteEntity;

  @OneToMany(
    () => RegistreComptoirEntity,
    (registreComptoir) => registreComptoir.anor,
  )
  registreComptoirs: RegistreComptoirEntity[];
}
