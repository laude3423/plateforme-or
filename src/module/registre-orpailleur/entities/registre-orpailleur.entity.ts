import { AgenceEntity } from 'src/module/agence/entities/agence.entity';
import { CollecteurEntity } from 'src/module/collecteurs/entities/collecteur.entity';
import { OrpailleurEntity } from 'src/module/orpailleurs/entities/orpailleur.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('registreOrpailleur')
export class RegistreOrpailleurEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: Date;

  @Column()
  quantite: number;

  @Column()
  prix: number;

  @Column({ type: 'varchar', length: 30 })
  lieu: string;

  @ManyToOne(
    () => OrpailleurEntity,
    (orpailleurs) => orpailleurs.registreOrpailleurs,
  )
  @JoinColumn({ name: 'orpailleurId', referencedColumnName: 'id' }) // Specify the foreign key column name
  orpailleurs: OrpailleurEntity;

  @ManyToOne(
    () => CollecteurEntity,
    (collecteurs) => collecteurs.registreOrpailleurs,
  )
  @JoinColumn({ name: 'collecteurId', referencedColumnName: 'id' }) // Specify the foreign key column name
  collecteurs: CollecteurEntity;

  @ManyToOne(() => AgenceEntity, (agence) => agence.registreOrpailleurs)
  @JoinColumn({ name: 'agenceId', referencedColumnName: 'id' }) // Specify the foreign key column name
  agence: AgenceEntity;
}
