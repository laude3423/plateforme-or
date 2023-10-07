import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictEntity } from './entities/district.entity';
import { Equal, Repository, getRepository } from 'typeorm';
import { RegionEntity } from '../region/entities/region.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(DistrictEntity)
    private districtRepository: Repository<DistrictEntity>,
    @InjectRepository(RegionEntity) // Inject the RegionEntity repository
    private regionRepository: Repository<RegionEntity>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    try {
      const { nomDistrict, regionId } = createDistrictDto;
      const existe = await this.districtRepository.findOne({
        where: { nomDistrict, region: { id: regionId } },
      });
      if (existe) {
        throw new BadRequestException(
          'Ce district existe déjà pour cette région!',
        );
      }

      const district = await this.districtRepository.create({
        nomDistrict,
        region: { id: regionId },
      });

      const saved = await this.districtRepository.save(district);

      if (!saved) throw new BadRequestException('District non ajouté!');

      return { message: 'District ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async getDistrict() {
    return await this.districtRepository.find({
      relations: {
        region: true,
      },
    });
  }

  async findAll(query?: string) {
    //  return await this.districtRepository.find();
    const myQuery = this.districtRepository
      .createQueryBuilder('district')
      .leftJoinAndSelect('district.region', 'region');

    //Check if query is present or not
    if (!(Object.keys(query).length === 0) && query.constructor === Object) {
      const queryKeys = Object.keys(query); //get the keys of the query string

      // check if title key is present
      if (queryKeys.includes('nomDistrict')) {
        myQuery.where('district.nomDistrict LIKE :nomDistrict', {
          nomDistrict: `%${query['nomDistrict']}$%`,
        });
      }
      return await myQuery.getMany();
    } else {
      return await myQuery.getMany();
    }
  }

  async findOne(id: number) {
    const district = await this.districtRepository.findOne({
      where: { id },
      relations: ['region'],
    });

    if (!district) throw new NotFoundException('District introuvable!');
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    try {
      const district = await this.findOne(id);
      const { nomDistrict, regionId } = updateDistrictDto;
      if (district) {
        const existe = await this.districtRepository.findOne({
          where: { nomDistrict, region: { id: regionId } },
        });
        if (existe && existe.id !== id) {
          return { message: 'Ce district existe déjà pour cette région!' };
        }
        district.region = null;
        Object.assign(district, updateDistrictDto);
        const newRegion = await this.regionRepository.findOne({
          where: { id: regionId },
        });
        if (!newRegion) throw new NotFoundException('Region not found');
        district.region = newRegion;

        const saved = await this.districtRepository.save(district);
        if (!saved) throw new BadRequestException();
        return { message: 'District modifié avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const district = await this.findOne(id);
    if (district) {
      const remove = await this.districtRepository.remove(district);
      return { message: 'District supprimé avec succès!', remove };
    }
  }

  async getDistrictsByRegion(regionId: number): Promise<DistrictEntity[]> {
    return await this.districtRepository.find({
      where: { region: Equal(regionId) },
    });
  }
}
