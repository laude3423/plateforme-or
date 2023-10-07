import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDateString } from 'class-validator';
import { RegistreCollecteurEntity } from 'src/module/registre-collecteur/entities/registre-collecteur.entity';
import { RegistreComptoirEntity } from 'src/module/registre-comptoir/entities/registre-comptoir.entity';
import { CompteEntity } from 'src/module/compte/entities/compte.entity';

@Entity('comptoir')
export class ComptoirEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nomSociete: string;

  @Column({ type: 'varchar', length: 50 })
  adresse: string;

  @Column({ type: 'varchar', length: 50 })
  nifStat: string;

  @Column()
  dateOuverture: Date;

  @Column({ type: 'varchar', length: 50 })
  directeur: string;

  @Column({ type: 'varchar', length: 50 })
  validation: string;

  @Column()
  stockComptoir: number;

  @Column({ type: 'varchar', length: 30 })
  arrete: string;

  @OneToMany(
    () => RegistreCollecteurEntity,
    (registreCollecteur) => registreCollecteur.comptoir,
  )
  registreCollecteurs: RegistreCollecteurEntity[];

  @OneToMany(
    () => RegistreComptoirEntity,
    (registreComptoir) => registreComptoir.pays,
  )
  registreComptoirs: RegistreComptoirEntity[];

  @ManyToOne(() => CompteEntity, (compte) => compte.comptoirs)
  @JoinColumn({ name: 'compteId', referencedColumnName: 'id' }) // Specify the foreign key column name
  compte: CompteEntity;
}
