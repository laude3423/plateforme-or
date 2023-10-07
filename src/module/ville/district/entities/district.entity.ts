import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { RegionEntity } from '../../region/entities/region.entity';
import { CommuneEntity } from '../../commune/entities/commune.entity';

@Entity('district')
export class DistrictEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nomDistrict: string;

  @ManyToOne(() => RegionEntity, (region) => region.districts)
  @JoinColumn({ name: 'regionId', referencedColumnName: 'id' }) // Specify the foreign key column name
  region: RegionEntity;

  @OneToMany(() => CommuneEntity, (commune) => commune.district)
  communes: CommuneEntity[];
}
