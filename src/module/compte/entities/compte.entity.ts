import { AdministrateurEntity } from 'src/module/administrateur/entities/administrateur.entity';
import { AgenceEntity } from 'src/module/agence/entities/agence.entity';
import { AnorEntity } from 'src/module/anor/entities/anor.entity';
import { ComptoirEntity } from 'src/module/comptoir/entities/comptoir.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('compte')
export class CompteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  utilisateur: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  motDePasse: string;

  @Column({ type: 'varchar', length: 20 })
  photo: string;

  @Column({ type: 'varchar', length: 20 })
  role: string;

  @OneToMany(
    () => AdministrateurEntity,
    (administrateur) => administrateur.compte,
  )
  administrateurs: AdministrateurEntity[];

  @OneToMany(() => AgenceEntity, (agence) => agence.compte)
  agences: AgenceEntity[];

  @OneToMany(() => ComptoirEntity, (comptoir) => comptoir.compte)
  comptoirs: ComptoirEntity[];

  @OneToMany(() => AnorEntity, (anor) => anor.compte)
  anors: AnorEntity[];
}
