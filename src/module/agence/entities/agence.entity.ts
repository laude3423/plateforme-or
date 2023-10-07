import { CompteEntity } from 'src/module/compte/entities/compte.entity';
import { RegistreCollecteurEntity } from 'src/module/registre-collecteur/entities/registre-collecteur.entity';
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

@Entity('agence')
export class AgenceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nomResponsable: string;

  @Column({ type: 'varchar', length: 50 })
  adresseResponsable: string;

  @Column({ type: 'varchar', length: 12 })
  cinResponsable: string;

  @Column({ type: 'varchar', length: 10 })
  contactResponsable: string;

  @ManyToOne(() => CommuneEntity, (commune) => commune.agences)
  @JoinColumn({ name: 'communeId', referencedColumnName: 'id' }) // Specify the foreign key column name
  commune: CommuneEntity;

  @ManyToOne(() => CompteEntity, (compte) => compte.agences)
  @JoinColumn({ name: 'compteId', referencedColumnName: 'id' }) // Specify the foreign key column name
  compte: CompteEntity;

  @OneToMany(
    () => RegistreCollecteurEntity,
    (registreCollecteur) => registreCollecteur.agence,
  )
  registreCollecteurs: RegistreCollecteurEntity[];

  @OneToMany(
    () => RegistreOrpailleurEntity,
    (registreOrpailleur) => registreOrpailleur.agence,
  )
  registreOrpailleurs: RegistreOrpailleurEntity[];
}
