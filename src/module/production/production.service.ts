import { Injectable } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ProductionEntity } from './entities/production.entity';
import { OrpailleurEntity } from '../orpailleurs/entities/orpailleur.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(ProductionEntity)
    private readonly productionRepository: Repository<ProductionEntity>,
    @InjectRepository(OrpailleurEntity)
    private readonly orpailleursRepository: Repository<OrpailleurEntity>,
  ) {}

  async create(createProductionDto: CreateProductionDto) {
    try {
      const { dateProduction, quantite, orpailleursId } = createProductionDto;
      const existe = await this.productionRepository.findOne({
        where: { dateProduction, orpailleur: { id: orpailleursId } },
      });
      if (existe) {
        return { message: 'Cet orpailleur existe déjà' };
      }
      const production = await this.productionRepository.create({
        dateProduction,
        quantite,
        orpailleur: { id: orpailleursId },
      });
      const saved = await this.productionRepository.save(production);
      if (!saved) throw new BadRequestException('Region non ajouté!');
      return { message: 'Region ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const production = this.productionRepository
      .createQueryBuilder('production')
      .leftJoinAndSelect('production.orpailleurs', 'orpailleurs');
    return await production.getMany();
  }

  async findOne(id: number) {
    const production = await this.productionRepository.findOne({
      where: { id },
      relations: ['orpailleurs'],
    });
    if (!production) throw new NotFoundException('Liste vide!');
    return production;
  }

  async update(id: number, updateProductionDto: UpdateProductionDto) {
    try {
      const region = await this.findOne(id);
      if (region) {
        const { dateProduction, quantite, orpailleursId } = updateProductionDto;
        const existe = await this.productionRepository.findOne({
          where: { id },
        });
        if (!existe) {
          return { message: "Cette production n'existe pas!" };
        }
        Object.assign(region, updateProductionDto);

        region.orpailleur = null;
        Object.assign(region, updateProductionDto);
        const newOrpailleur = await this.orpailleursRepository.findOne({
          where: { id: orpailleursId },
        });
        if (!newOrpailleur) throw new NotFoundException('Region not found');
        region.orpailleur = newOrpailleur;

        const saved = await this.orpailleursRepository.save(region);
        if (!saved) throw new BadRequestException();
        return { message: 'Region modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const production = await this.findOne(id);
    if (production) {
      const remove = await this.productionRepository.remove(production);
      return { message: 'Production supprimé avec succès!', remove };
    }
  }
}
