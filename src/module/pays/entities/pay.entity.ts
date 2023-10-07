import { RegistreComptoirEntity } from 'src/module/registre-comptoir/entities/registre-comptoir.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pays')
export class PayEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 40 })
  nomPays: string;

  @OneToMany(
    () => RegistreComptoirEntity,
    (registreComptoir) => registreComptoir.pays,
  )
  registreComptoirs: RegistreComptoirEntity[];
}
