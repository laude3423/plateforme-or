import { Injectable } from '@nestjs/common';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompteEntity } from './entities/compte.entity';

@Injectable()
export class CompteService {
  constructor(
    @InjectRepository(CompteEntity)
    private readonly compteRepository: Repository<CompteEntity>,
  ) {}

  async create(createCompteDto: CreateCompteDto) {
    try {
      const { email } = createCompteDto;
      const existe = await this.compteRepository.findOne({
        where: { email },
      });
      if (existe) {
        throw new NotFoundException('Cette compte existe déjà!');
      } else {
        const compte = await this.compteRepository.create(createCompteDto);
        const saved = await this.compteRepository.save(compte);
        if (!saved) throw new BadRequestException('Compte non ajouté!');
        return { message: 'Compte ajouté avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    try {
      const compte = await this.compteRepository.find();
      return compte;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findOne(id: number) {
    const compte = await this.compteRepository.findOne({
      where: { id },
    });
    if (!compte) throw new NotFoundException('Liste vide!');
    return compte;
  }

  async update(id: number, updateCompteDto: UpdateCompteDto) {
    try {
      const compte = await this.findOne(id);
      if (compte) {
        const { email } = updateCompteDto;
        const existe = await this.compteRepository.findOne({
          where: { email },
        });
        if (existe) {
          throw new NotFoundException('Cette compte existe déjà!');
        } else {
          Object.assign(compte, updateCompteDto);
          const saved = await this.compteRepository.save(compte);
          if (!saved) throw new BadRequestException();
          return { message: 'Compte modifier avec succès!', saved };
        }
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const compte = await this.findOne(id);
    if (compte) {
      const remove = await this.compteRepository.remove(compte);
      return { message: 'Compte supprimé avec succès!', remove };
    }
  }
}
