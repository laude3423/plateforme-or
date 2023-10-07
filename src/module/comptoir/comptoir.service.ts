import { Injectable } from '@nestjs/common';
import { CreateComptoirDto } from './dto/create-comptoir.dto';
import { UpdateComptoirDto } from './dto/update-comptoir.dto';
import { ComptoirEntity } from './entities/comptoir.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ComptoirService {
  constructor(
    @InjectRepository(ComptoirEntity)
    private readonly comptoiRepository: Repository<ComptoirEntity>,
  ) {}
  async create(createComptoirDto: CreateComptoirDto) {
    try {
      const { nomSociete } = createComptoirDto;
      const existe = await this.comptoiRepository.findOne({
        where: { nomSociete },
      });
      if (existe) {
        throw new NotFoundException('Ce comptoir existe déjà!');
      } else {
        const comptoir = await this.comptoiRepository.create(createComptoirDto);
        const saved = await this.comptoiRepository.save(comptoir);
        if (!saved) throw new BadRequestException('Comptoir non ajouté!');
        return { message: 'Comptoir ajouté avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    try {
      const comptoir = await this.comptoiRepository.find();
      return comptoir;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findOne(id: number) {
    const comptoir = await this.comptoiRepository.findOne({
      where: { id },
    });
    if (!comptoir) throw new NotFoundException('Liste vide!');
    return comptoir;
  }

  async update(id: number, updateComptoirDto: UpdateComptoirDto) {
    try {
      const comptoir = await this.findOne(id);
      if (comptoir) {
        const { nomSociete } = updateComptoirDto;
        const existe = await this.comptoiRepository.findOne({
          where: { nomSociete },
        });
        if (existe && existe.id !== id) {
          return { message: 'Ce comptoir existe déjà!' };
        } else {
          Object.assign(comptoir, updateComptoirDto);
          const saved = await this.comptoiRepository.save(comptoir);
          if (!saved) throw new BadRequestException();
          return { message: 'Comptoir modifier avec succès!', saved };
        }
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const comptoir = await this.findOne(id);
    if (comptoir) {
      const remove = await this.comptoiRepository.remove(comptoir);
      return { message: 'Comptoir supprimé avec succès!', remove };
    }
  }
}
