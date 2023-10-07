import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ProvinceEntity } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}

  async create(createProvinceDto: CreateProvinceDto) {
    try {
      const { nomProvince } = createProvinceDto;
      const existe = await this.provinceRepository.findOne({
        where: { nomProvince },
      });
      if (existe) {
        throw new NotFoundException('Cette province existe déjà!');
      } else {
        const province =
          await this.provinceRepository.create(createProvinceDto);
        const saved = await this.provinceRepository.save(province);
        if (!saved) throw new BadRequestException('Province non ajouté!');
        return { message: 'Province ajouté avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    try {
      const province = await this.provinceRepository.find();
      return province;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findOne(id: number) {
    const province = await this.provinceRepository.findOne({
      where: { id },
    });
    if (!province) throw new NotFoundException('Liste vide!');
    return province;
  }

  async update(id: number, updateProvinceDto: UpdateProvinceDto) {
    try {
      const province = await this.findOne(id);
      if (province) {
        const { nomProvince } = updateProvinceDto;
        const existe = await this.provinceRepository.findOne({
          where: { nomProvince },
        });
        if (existe) {
          throw new NotFoundException('Cette Province existe déjà!');
        } else {
          Object.assign(province, updateProvinceDto);
          const saved = await this.provinceRepository.save(province);
          if (!saved) throw new BadRequestException();
          return { message: 'Province modifier avec succès!', saved };
        }
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const province = await this.findOne(id);
    if (province) {
      const remove = await this.provinceRepository.remove(province);
      return { message: 'Province supprimé avec succès!', remove };
    }
  }
}
