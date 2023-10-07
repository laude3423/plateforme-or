import { RegionEntity } from '../../region/entities/region.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('province')
export class ProvinceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  nomProvince: string;

  @OneToMany(() => RegionEntity, (region) => region.province)
  regions: RegionEntity[];
}
