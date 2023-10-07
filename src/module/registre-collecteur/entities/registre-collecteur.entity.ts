import { AgenceEntity } from 'src/module/agence/entities/agence.entity';
import { CollecteurEntity } from 'src/module/collecteurs/entities/collecteur.entity';
import { ComptoirEntity } from 'src/module/comptoir/entities/comptoir.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('registreCollecteur')
export class RegistreCollecteurEntity {
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

  @ManyToOne(() => ComptoirEntity, (comptoir) => comptoir.registreCollecteurs)
  @JoinColumn({ name: 'comptoirId', referencedColumnName: 'id' }) // Specify the foreign key column name
  comptoir: ComptoirEntity;

  @ManyToOne(
    () => CollecteurEntity,
    (collecteurs) => collecteurs.registreCollecteurs,
  )
  @JoinColumn({ name: 'collecteurId', referencedColumnName: 'id' }) // Specify the foreign key column name
  collecteurs: CollecteurEntity;

  @ManyToOne(() => AgenceEntity, (agence) => agence.registreCollecteurs)
  @JoinColumn({ name: 'agenceId', referencedColumnName: 'id' }) // Specify the foreign key column name
  agence: AgenceEntity;
}
