import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DistrictEntity } from '../../district/entities/district.entity';
import { ProvinceEntity } from '../../province/entities/province.entity';

@Entity('region')
export class RegionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => DistrictEntity, (district) => district.region)
  districts: DistrictEntity[]; // Changed property name to plural 'districts'

  @Column({ type: 'varchar', length: 20 })
  nomRegion: string;

  @ManyToOne(() => ProvinceEntity, (province) => province.regions)
  @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' }) // Specify the foreign key column name
  province: ProvinceEntity;
}
