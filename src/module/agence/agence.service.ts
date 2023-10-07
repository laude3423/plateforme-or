import { Injectable } from '@nestjs/common';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';
import { AgenceEntity } from './entities/agence.entity';
import { CompteEntity } from '../compte/entities/compte.entity';
import { CommuneEntity } from '../ville/commune/entities/commune.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class AgenceService {
  constructor(
    @InjectRepository(AgenceEntity)
    private readonly agenceRepository: Repository<AgenceEntity>,
    @InjectRepository(CompteEntity)
    private readonly compteRepository: Repository<CompteEntity>,
    @InjectRepository(CommuneEntity)
    private readonly communeRepository: Repository<CommuneEntity>,
  ) {}

  async create(createAgenceDto: CreateAgenceDto) {
    try {
      const {
        nomResponsable,
        adresseResponsable,
        cinResponsable,
        contactResponsable,
        compteId,
        communeId,
      } = createAgenceDto;
      const existe = await this.agenceRepository.findOne({
        where: {
          cinResponsable,
          compte: { id: compteId },
        },
      });
      if (existe) {
        return { message: 'Cette personne existe déjà' };
      }
      const agence = await this.agenceRepository.create({
        nomResponsable,
        adresseResponsable,
        cinResponsable,
        contactResponsable,
        compte: { id: compteId },
        commune: { id: communeId },
      });
      const saved = await this.agenceRepository.save(agence);
      if (!saved) throw new BadRequestException('Agence non ajouté!');
      return { message: 'Agence ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const agence = await this.agenceRepository
      .createQueryBuilder('agence')
      .leftJoinAndSelect('agence.compte', 'compte')
      .leftJoinAndSelect('agence.commune', 'commune');
    return await agence.getMany();
  }

  async findOne(id: number) {
    const agence = await this.agenceRepository.findOne({
      where: { id },
      relations: ['compte', 'commune'],
    });
    if (!agence) throw new NotFoundException('Liste vide!');
    return agence;
  }

  async update(id: number, updateAgenceDto: UpdateAgenceDto) {
    try {
      const agence = await this.findOne(id);
      if (agence) {
        const { nomResponsable, compteId, cinResponsable, communeId } =
          updateAgenceDto;
        const existe = await this.agenceRepository.findOne({
          where: {
            cinResponsable,
            compte: { id: compteId },
          },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cet agence existe déjà!' };
        }
        Object.assign(agence, updateAgenceDto);

        agence.compte = null;
        agence.commune = null;
        Object.assign(agence, updateAgenceDto);
        const newCompte = await this.compteRepository.findOne({
          where: { id: compteId },
        });
        const newCommmune = await this.communeRepository.findOne({
          where: { id: communeId },
        });
        if (!newCompte) throw new NotFoundException('comptoir not found');
        agence.compte = newCompte;
        agence.commune = newCommmune;

        const saved = await this.agenceRepository.save(agence);
        if (!saved) throw new BadRequestException();
        return { message: 'Agence modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const agence = await this.findOne(id);
    if (agence) {
      const remove = await this.agenceRepository.remove(agence);
      return { message: 'Agence supprimé avec succès!', remove };
    }
  }
}
