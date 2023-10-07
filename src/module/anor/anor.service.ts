import { Injectable } from '@nestjs/common';
import { CreateAnorDto } from './dto/create-anor.dto';
import { UpdateAnorDto } from './dto/update-anor.dto';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CompteEntity } from '../compte/entities/compte.entity';
import { AnorEntity } from './entities/anor.entity';

@Injectable()
export class AnorService {
  constructor(
    @InjectRepository(AnorEntity)
    private readonly anorRepository: Repository<AnorEntity>,
    @InjectRepository(CompteEntity)
    private readonly compteRepository: Repository<CompteEntity>,
  ) {}

  async create(createAnorDto: CreateAnorDto) {
    try {
      const {
        nomResponsable,
        adresseResponsable,
        cinResponsable,
        contactResponsable,
        compteId,
      } = createAnorDto;
      const existe = await this.anorRepository.findOne({
        where: {
          cinResponsable,
          compte: { id: compteId },
        },
      });
      if (existe) {
        return { message: 'Cette personne existe déjà' };
      }
      const anor = await this.anorRepository.create({
        nomResponsable,
        adresseResponsable,
        cinResponsable,
        contactResponsable,
        compte: { id: compteId },
      });
      const saved = await this.anorRepository.save(anor);
      if (!saved) throw new BadRequestException('Anor non ajouté!');
      return { message: 'Anor ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const anor = await this.anorRepository
      .createQueryBuilder('anor')
      .leftJoinAndSelect('anor.compte', 'compte');
    return await anor.getMany();
  }

  async findOne(id: number) {
    const anor = await this.anorRepository.findOne({
      where: { id },
      relations: ['compte'],
    });
    if (!anor) throw new NotFoundException('Liste vide!');
    return anor;
  }

  async update(id: number, updateAnorDto: UpdateAnorDto) {
    try {
      const anor = await this.findOne(id);
      if (anor) {
        const { compteId, cinResponsable } = updateAnorDto;
        const existe = await this.anorRepository.findOne({
          where: {
            cinResponsable,
            compte: { id: compteId },
          },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cet anor existe déjà!' };
        }
        Object.assign(anor, updateAnorDto);

        anor.compte = null;
        Object.assign(anor, updateAnorDto);
        const newCompte = await this.compteRepository.findOne({
          where: { id: compteId },
        });
        if (!newCompte) throw new NotFoundException('comptoir not found');
        anor.compte = newCompte;

        const saved = await this.anorRepository.save(anor);
        if (!saved) throw new BadRequestException();
        return { message: 'Anor modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const anor = await this.findOne(id);
    if (anor) {
      const remove = await this.anorRepository.remove(anor);
      return { message: 'Anor supprimé avec succès!', remove };
    }
  }
}
