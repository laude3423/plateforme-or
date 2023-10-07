import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommuneDto } from './dto/create-commune.dto';
import { UpdateCommuneDto } from './dto/update-commune.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommuneEntity } from './entities/commune.entity';
import { Equal, Repository } from 'typeorm';
import { DistrictEntity } from '../district/entities/district.entity';

@Injectable()
export class CommuneService {
  constructor(
    @InjectRepository(CommuneEntity)
    private readonly communeRepository: Repository<CommuneEntity>,
    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,
  ) {}
  async createCommune(createCommuneDto: CreateCommuneDto) {
    try {
      const { nomCommune, districtId } = createCommuneDto;
      const existe = await this.communeRepository.findOne({
        where: { nomCommune, district: { id: districtId } },
      });
      if (existe) {
        throw new BadRequestException(
          'Cette commune est déjà existe pour le district',
        );
      }
      const commune = await this.communeRepository.create({
        nomCommune,
        district: { id: districtId },
      });
      const saved = await this.communeRepository.save(commune);
      if (!saved) throw new BadRequestException('Commune non ajouté');
      return { message: 'Commune ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll(query?: string) {
    //  return await this.districtRepository.find();
    const myQuery = this.communeRepository
      .createQueryBuilder('commune')
      .leftJoinAndSelect('commune.district', 'district')
      .leftJoinAndSelect('district.region', 'region');

    //Check if query is present or not
    if (!(Object.keys(query).length === 0) && query.constructor === Object) {
      const queryKeys = Object.keys(query); //get the keys of the query string

      // check if title key is present
      if (queryKeys.includes('nomCommune')) {
        myQuery.where('commune.nomCommune LIKE :nomCommune', {
          nomCommune: `%${query['nomCommune']}$%`,
        });
      }
      return await myQuery.getMany();
    } else {
      return await myQuery.getMany();
    }
  }

  async findOne(id: number) {
    const commune = await this.communeRepository.findOne({
      where: { id },
      relations: ['district', 'district.region'],
    });

    if (!commune) throw new NotFoundException('Commune introuvable!');
    return commune;
  }

  async update(id: number, updateCommuneDto: UpdateCommuneDto) {
    try {
      const commune = await this.findOne(id);
      const { nomCommune, districtId } = updateCommuneDto;
      if (commune) {
        const existe = await this.communeRepository.findOne({
          where: { nomCommune, district: { id: districtId } },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cette commune est déjà existe pour le district' };
        }
        commune.district = null;
        Object.assign(commune, updateCommuneDto);

        const newDistrict = await this.districtRepository.findOne({
          where: { id: districtId },
        });
        if (!newDistrict)
          return { message: "Le district que vous avez entrer n'existe pas" };
        commune.district = newDistrict;

        const saved = await this.communeRepository.save(commune);
        if (!saved) throw new BadRequestException();
        return { message: 'Commune modifiée avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const commune = await this.findOne(id);
    if (commune) {
      const remove = await this.communeRepository.remove(commune);
      return { message: 'Commune supprimé avec succès!', remove };
    }
  }

  async getCommunesByDistrict(districtId: number): Promise<CommuneEntity[]> {
    return await this.communeRepository.find({
      where: { district: Equal(districtId) },
    });
  }
}
