import { Injectable } from '@nestjs/common';
import { CreateOrpailleurDto } from './dto/create-orpailleur.dto';
import { UpdateOrpailleurDto } from './dto/update-orpailleur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { OrpailleurEntity } from './entities/orpailleur.entity';
import { CommuneEntity } from '../ville/commune/entities/commune.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrpailleursService {
  constructor(
    @InjectRepository(OrpailleurEntity)
    private readonly orpailleursRepository: Repository<OrpailleurEntity>,
    @InjectRepository(CommuneEntity)
    private readonly communeRepository: Repository<CommuneEntity>,
  ) {}

  async create(createOrpailleurDto: CreateOrpailleurDto) {
    try {
      const {
        numeroIdentification,
        nom,
        prenom,
        adresse,
        sexe,
        cin,
        dateCin,
        lieuCin,
        validateAnnee,
        lieuOctroit,
        dateOctroit,
        photo,
        stockOrpailleur,
        communeId,
      } = createOrpailleurDto;
      const existe = await this.orpailleursRepository.findOne({
        where: { cin },
      });
      if (existe) {
        return { message: 'Cet orpailleur existe déjà' };
      }
      const orpailleur = await this.orpailleursRepository.create({
        numeroIdentification,
        nom,
        prenom,
        adresse,
        sexe,
        cin,
        dateCin,
        lieuCin,
        validateAnnee,
        lieuOctroit,
        dateOctroit,
        photo,
        stockOrpailleur,
        commune: { id: communeId },
      });
      const saved = await this.orpailleursRepository.save(orpailleur);
      if (!saved) throw new BadRequestException('Orpailleur non ajouté!');
      return { message: 'Orpailleur ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const orpailleurs = await this.orpailleursRepository
      .createQueryBuilder('orpailleurs')
      .leftJoinAndSelect('orpailleurs.commune', 'commune');
    return await orpailleurs.getMany();
  }

  async findOne(id: number) {
    const orpailleur = await this.orpailleursRepository.findOne({
      where: { id },
      relations: ['commune'],
    });
    if (!orpailleur) throw new NotFoundException('Liste vide!');
    return orpailleur;
  }

  async update(id: number, updateOrpailleurDto: UpdateOrpailleurDto) {
    try {
      const orpailleur = await this.findOne(id);
      if (orpailleur) {
        const { communeId, cin } = updateOrpailleurDto;
        const existe = await this.orpailleursRepository.findOne({
          where: { cin, id: Not(id) },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cet orpailleur existe déjà!' };
        }
        Object.assign(orpailleur, updateOrpailleurDto);

        orpailleur.commune = null;
        Object.assign(orpailleur, updateOrpailleurDto);
        const newCommune = await this.communeRepository.findOne({
          where: { id: communeId },
        });
        if (!newCommune) throw new NotFoundException('Commune not found');
        orpailleur.commune = newCommune;

        const saved = await this.orpailleursRepository.save(orpailleur);
        if (!saved) throw new BadRequestException();
        return { message: 'Orpailleur modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const orpailleur = await this.findOne(id);
    if (orpailleur) {
      const remove = await this.orpailleursRepository.remove(orpailleur);
      return { message: 'Orpailleur supprimé avec succès!', remove };
    }
  }
}
