import { OrpailleurEntity } from 'src/module/orpailleurs/entities/orpailleur.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('production')
export class ProductionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  dateProduction: Date;

  @Column()
  quantite: number;

  @ManyToOne(() => OrpailleurEntity, (orpailleur) => orpailleur.productions)
  @JoinColumn({ name: 'orpailleurId', referencedColumnName: 'id' }) // Specify the foreign key column name
  orpailleur: OrpailleurEntity;
}
