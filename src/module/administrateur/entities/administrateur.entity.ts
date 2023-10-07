import { CompteEntity } from 'src/module/compte/entities/compte.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('administrateur')
export class AdministrateurEntity {
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

  @ManyToOne(() => CompteEntity, (compte) => compte.administrateurs)
  @JoinColumn({ name: 'compteId', referencedColumnName: 'id' }) // Specify the foreign key column name
  compte: CompteEntity;
}
