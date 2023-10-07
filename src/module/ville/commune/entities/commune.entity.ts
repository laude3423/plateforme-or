import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DistrictEntity } from '../../district/entities/district.entity';
import { OrpailleurEntity } from 'src/module/orpailleurs/entities/orpailleur.entity';
import { CollecteurEntity } from 'src/module/collecteurs/entities/collecteur.entity';
import { AgenceEntity } from 'src/module/agence/entities/agence.entity';

@Entity('commune')
export class CommuneEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nomCommune: string;

  @ManyToOne(() => DistrictEntity, (district) => district.communes)
  @JoinColumn({ name: 'districtId', referencedColumnName: 'id' }) // Specify the foreign key column name
  district: DistrictEntity;

  @OneToMany(() => OrpailleurEntity, (orpailleur) => orpailleur.commune)
  orpailleurs: OrpailleurEntity[];

  @OneToMany(() => CollecteurEntity, (collecteur) => collecteur.commune)
  collecteurs: CollecteurEntity[];

  @OneToMany(() => AgenceEntity, (agence) => agence.commune)
  agences: AgenceEntity[];
}
