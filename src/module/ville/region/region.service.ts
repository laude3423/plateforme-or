import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';
import { Not, Repository } from 'typeorm';
import { ProvinceEntity } from '../province/entities/province.entity';
@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}
  //ajouter region
  async create(createRegionDto: CreateRegionDto) {
    try {
      const { nomRegion, provinceId } = createRegionDto;
      const existe = await this.regionRepository.findOne({
        where: { nomRegion },
      });
      if (existe) {
        return { message: 'Cette région existe déjà' };
      }
      const region = await this.regionRepository.create({
        nomRegion,
        province: { id: provinceId },
      });
      const saved = await this.regionRepository.save(region);
      if (!saved) throw new BadRequestException('Region non ajouté!');
      return { message: 'Region ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
  //afficher region
  async findAll() {
    const region = this.regionRepository
      .createQueryBuilder('region')
      .leftJoinAndSelect('region.province', 'province');
    return await region.getMany();
  }

  async findOne(id: number) {
    const region = await this.regionRepository.findOne({
      where: { id },
      relations: ['province'],
    });
    if (!region) throw new NotFoundException('Liste vide!');
    return region;
  }
  //Modification
  async update(id: number, updateRegionDto: UpdateRegionDto) {
    try {
      const region = await this.findOne(id);
      if (region) {
        const { nomRegion, provinceId } = updateRegionDto;
        const existe = await this.regionRepository.findOne({
          where: { nomRegion, id: Not(id) },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cette région existe déjà!' };
        }
        Object.assign(region, updateRegionDto);

        region.province = null;
        Object.assign(region, updateRegionDto);
        const newProvince = await this.provinceRepository.findOne({
          where: { id: provinceId },
        });
        if (!newProvince) throw new NotFoundException('Region not found');
        region.province = newProvince;

        const saved = await this.regionRepository.save(region);
        if (!saved) throw new BadRequestException();
        return { message: 'Region modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
  //suppression
  async remove(id: number) {
    const region = await this.findOne(id);
    if (region) {
      const remove = await this.regionRepository.remove(region);
      return { message: 'Region supprimé avec succès!', remove };
    }
  }
}
