import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDateString } from 'class-validator';
import { CommuneEntity } from 'src/module/ville/commune/entities/commune.entity';
import { RegistreOrpailleurEntity } from 'src/module/registre-orpailleur/entities/registre-orpailleur.entity';
import { RegistreCollecteurEntity } from 'src/module/registre-collecteur/entities/registre-collecteur.entity';

@Entity('collecteurs')
export class CollecteurEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  numeroIdentification: string;

  @Column({ type: 'varchar', length: 30 })
  nom: string;

  @Column({ type: 'varchar', length: 30 })
  prenom: string;

  @Column({ type: 'varchar', length: 50 })
  adresse: string;

  @Column({ type: 'varchar', length: 10 })
  sexe: string;

  @Column({ type: 'varchar', length: 12 })
  cin: string;

  @Column({ type: 'date' })
  @IsDateString()
  dateCin: Date;

  @Column({ type: 'varchar', length: 30 })
  lieuCin: string;

  @Column({ type: 'varchar', length: 30 })
  lieuOctroit: string;

  @Column({ type: 'date' })
  @IsDateString()
  dateOctroit: Date;

  @Column({ type: 'varchar', length: 4 })
  validateAnnee: string;

  @Column({ type: 'varchar', length: 30 })
  photo: string;

  @Column({ type: 'varchar', length: 30 })
  attestation: string;

  @Column()
  stockCollecteur: number;

  @ManyToOne(() => CommuneEntity, (commune) => commune.collecteurs)
  @JoinColumn({ name: 'communeId', referencedColumnName: 'id' }) // Specify the foreign key column name
  commune: CommuneEntity;

  @OneToMany(
    () => RegistreOrpailleurEntity,
    (registreOrpailleur) => registreOrpailleur.collecteurs,
  )
  registreOrpailleurs: RegistreOrpailleurEntity[];

  @OneToMany(
    () => RegistreCollecteurEntity,
    (registreCollecteur) => registreCollecteur.collecteurs,
  )
  registreCollecteurs: RegistreCollecteurEntity[];
}
