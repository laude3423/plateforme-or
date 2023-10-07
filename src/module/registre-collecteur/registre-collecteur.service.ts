import { Injectable } from '@nestjs/common';
import { CreateRegistreCollecteurDto } from './dto/create-registre-collecteur.dto';
import { UpdateRegistreCollecteurDto } from './dto/update-registre-collecteur.dto';
import { ComptoirEntity } from '../comptoir/entities/comptoir.entity';
import { CollecteurEntity } from '../collecteurs/entities/collecteur.entity';
import { RegistreCollecteurEntity } from './entities/registre-collecteur.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AgenceEntity } from '../agence/entities/agence.entity';

@Injectable()
export class RegistreCollecteurService {
  constructor(
    @InjectRepository(ComptoirEntity)
    private readonly comptoiRepository: Repository<ComptoirEntity>,
    @InjectRepository(CollecteurEntity)
    private readonly collecteurRepository: Repository<CollecteurEntity>,
    @InjectRepository(AgenceEntity)
    private readonly agenceRepository: Repository<AgenceEntity>,
    @InjectRepository(RegistreCollecteurEntity)
    private readonly registreCollecteur: Repository<RegistreCollecteurEntity>,
  ) {}

  async create(createRegistreCollecteurDto: CreateRegistreCollecteurDto) {
    try {
      const { date, quantite, prix, lieu, collecteurId, comptoirId, agenceId } =
        createRegistreCollecteurDto;
      const existe = await this.registreCollecteur.findOne({
        where: {
          date,
          collecteurs: { id: collecteurId },
        },
      });
      if (existe) {
        return { message: 'Cette registre existe déjà' };
      }
      const orpailleur = await this.registreCollecteur.create({
        date,
        quantite,
        prix,
        lieu,
        collecteurs: { id: collecteurId },
        comptoir: { id: comptoirId },
        agence: { id: agenceId },
      });
      const saved = await this.registreCollecteur.save(orpailleur);
      if (!saved) throw new BadRequestException('Registre non ajouté!');
      return { message: 'Registre ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const registre = await this.registreCollecteur
      .createQueryBuilder('registreCollecteur')
      .leftJoinAndSelect('registreCollecteur.comptoir', 'comptoir')
      .leftJoinAndSelect('registreCollecteur.agence', 'agence')
      .leftJoinAndSelect('registreCollecteur.collecteur', 'collecteur');
    return await registre.getMany();
  }

  async findOne(id: number) {
    const registre = await this.registreCollecteur.findOne({
      where: { id },
      relations: ['comptoir', 'collecteur', 'agence'],
    });
    if (!registre) throw new NotFoundException('Liste vide!');
    return registre;
  }

  async update(
    id: number,
    updateRegistreCollecteurDto: UpdateRegistreCollecteurDto,
  ) {
    try {
      const registre = await this.findOne(id);
      if (registre) {
        const { collecteurId, date, comptoirId, agenceId } =
          updateRegistreCollecteurDto;
        const existe = await this.registreCollecteur.findOne({
          where: {
            date,
            collecteurs: { id: collecteurId },
            comptoir: { id: comptoirId },
          },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cette registre existe déjà!' };
        }
        Object.assign(registre, updateRegistreCollecteurDto);

        registre.collecteurs = null;
        registre.comptoir = null;
        registre.agence = null;
        Object.assign(registre, updateRegistreCollecteurDto);
        const newCollecteur = await this.collecteurRepository.findOne({
          where: { id: collecteurId },
        });
        const newComptoir = await this.comptoiRepository.findOne({
          where: { id: comptoirId },
        });
        const newAgence = await this.agenceRepository.findOne({
          where: { id: agenceId },
        });
        if (!newComptoir) throw new NotFoundException('comptoir not found');
        if (!newCollecteur) throw new NotFoundException('Collecteur not found');
        if (!newAgence) throw new NotFoundException('Agence not found');
        registre.comptoir = newComptoir;
        registre.collecteurs = newCollecteur;
        registre.agence = newAgence;

        const saved = await this.registreCollecteur.save(registre);
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
      const remove = await this.registreCollecteur.remove(registre);
      return { message: 'Registre supprimé avec succès!', remove };
    }
  }
}
