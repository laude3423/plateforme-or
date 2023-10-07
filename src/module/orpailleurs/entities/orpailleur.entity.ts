import { IsDateString } from 'class-validator';
import { ProductionEntity } from 'src/module/production/entities/production.entity';
import { RegistreOrpailleurEntity } from 'src/module/registre-orpailleur/entities/registre-orpailleur.entity';
import { CommuneEntity } from 'src/module/ville/commune/entities/commune.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orpailleurs')
export class OrpailleurEntity {
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

  @Column()
  stockOrpailleur: number;

  @ManyToOne(() => CommuneEntity, (commune) => commune.orpailleurs)
  @JoinColumn({ name: 'communeId', referencedColumnName: 'id' }) // Specify the foreign key column name
  commune: CommuneEntity;

  @OneToMany(() => ProductionEntity, (production) => production.orpailleur)
  productions: ProductionEntity[];

  @OneToMany(
    () => RegistreOrpailleurEntity,
    (registreOrpailleur) => registreOrpailleur.orpailleurs,
  )
  registreOrpailleurs: RegistreOrpailleurEntity[];
}
