import { Injectable } from '@nestjs/common';
import { CreateRegistreOrpailleurDto } from './dto/create-registre-orpailleur.dto';
import { UpdateRegistreOrpailleurDto } from './dto/update-registre-orpailleur.dto';
import { RegistreOrpailleurEntity } from './entities/registre-orpailleur.entity';
import { CollecteurEntity } from '../collecteurs/entities/collecteur.entity';
import { OrpailleurEntity } from '../orpailleurs/entities/orpailleur.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AgenceEntity } from '../agence/entities/agence.entity';

@Injectable()
export class RegistreOrpailleurService {
  constructor(
    @InjectRepository(OrpailleurEntity)
    private readonly orpailleurRepository: Repository<OrpailleurEntity>,
    @InjectRepository(CollecteurEntity)
    private readonly collecteurRepository: Repository<CollecteurEntity>,
    @InjectRepository(AgenceEntity)
    private readonly agenceRepository: Repository<AgenceEntity>,
    @InjectRepository(RegistreOrpailleurEntity)
    private readonly registreOrpailleurs: Repository<RegistreOrpailleurEntity>,
  ) {}

  async create(createRegistreOrpailleurDto: CreateRegistreOrpailleurDto) {
    try {
      const {
        date,
        quantite,
        prix,
        lieu,
        collecteurId,
        orpailleursId,
        agenceId,
      } = createRegistreOrpailleurDto;
      const existe = await this.registreOrpailleurs.findOne({
        where: {
          date,
          collecteurs: { id: collecteurId },
          orpailleurs: { id: orpailleursId },
        },
      });
      if (existe) {
        return { message: 'Cette registre existe déjà' };
      }
      const registre = await this.registreOrpailleurs.create({
        date,
        quantite,
        prix,
        lieu,
        collecteurs: { id: collecteurId },
        orpailleurs: { id: orpailleursId },
        agence: { id: agenceId },
      });
      const saved = await this.registreOrpailleurs.save(registre);
      if (!saved) throw new BadRequestException('Registre non ajouté!');
      return { message: 'Registre ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const registre = await this.registreOrpailleurs
      .createQueryBuilder('registre-orpailleur')
      .leftJoinAndSelect('registre-orpailleur.collecteurs', 'collecteurs')
      .leftJoinAndSelect('registre-orpailleur.agence', 'agence')
      .leftJoinAndSelect('registre-orpailleur.orpailleurs', 'orpailleurs');
    return await registre.getMany();
  }

  async findOne(id: number) {
    const registre = await this.registreOrpailleurs.findOne({
      where: { id },
      relations: ['orpailleurs', 'collecteurs', 'agence'],
    });
    if (!registre) throw new NotFoundException('Liste vide!');
    return registre;
  }

  async update(
    id: number,
    updateRegistreOrpailleurDto: UpdateRegistreOrpailleurDto,
  ) {
    try {
      const registre = await this.findOne(id);
      if (registre) {
        const { collecteurId, date, orpailleursId, agenceId } =
          updateRegistreOrpailleurDto;
        const existe = await this.registreOrpailleurs.findOne({
          where: {
            date,
            collecteurs: { id: collecteurId },
            orpailleurs: { id: orpailleursId },
          },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cette registre existe déjà!' };
        }
        Object.assign(registre, updateRegistreOrpailleurDto);

        registre.collecteurs = null;
        registre.orpailleurs = null;
        registre.agence = null;
        Object.assign(registre, updateRegistreOrpailleurDto);
        const newCollecteur = await this.collecteurRepository.findOne({
          where: { id: collecteurId },
        });
        const newOrpailleur = await this.orpailleurRepository.findOne({
          where: { id: orpailleursId },
        });
        const newAgence = await this.agenceRepository.findOne({
          where: { id: agenceId },
        });
        if (!newOrpailleur) throw new NotFoundException('Orpailleur not found');
        if (!newCollecteur) throw new NotFoundException('Collecteur not found');
        registre.orpailleurs = newOrpailleur;
        registre.collecteurs = newCollecteur;
        registre.agence = newAgence;

        const saved = await this.registreOrpailleurs.save(registre);
        if (!saved) throw new BadRequestException();
        return { message: 'registre modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const registre = await this.findOne(id);
    if (registre) {
      const remove = await this.registreOrpailleurs.remove(registre);
      return { message: 'Registre supprimé avec succès!', remove };
    }
  }
}
