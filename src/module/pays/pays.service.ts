import { Injectable } from '@nestjs/common';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { PayEntity } from './entities/pay.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class PaysService {
  constructor(
    @InjectRepository(PayEntity)
    private readonly paysRepository: Repository<PayEntity>,
  ) {}

  async create(createPayDto: CreatePayDto) {
    try {
      const { nomPays } = createPayDto;
      const existe = await this.paysRepository.findOne({
        where: { nomPays },
      });
      if (existe) {
        throw new NotFoundException('Ce comptoir existe déjà!');
      } else {
        const pays = await this.paysRepository.create(createPayDto);
        const saved = await this.paysRepository.save(pays);
        if (!saved) throw new BadRequestException('Pays non ajouté!');
        return { message: 'Pays ajouté avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    try {
      const pays = await this.paysRepository.find();
      return pays;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findOne(id: number) {
    const pays = await this.paysRepository.findOne({
      where: { id },
    });
    if (!pays) throw new NotFoundException('Liste vide!');
    return pays;
  }

  async update(id: number, updatePayDto: UpdatePayDto) {
    try {
      const pays = await this.findOne(id);
      if (pays) {
        const { nomPays } = updatePayDto;
        const existe = await this.paysRepository.findOne({
          where: { nomPays },
        });
        if (existe && existe.id !== id) {
          return { message: 'Ce pays existe déjà!' };
        } else {
          Object.assign(pays, updatePayDto);
          const saved = await this.paysRepository.save(pays);
          if (!saved) throw new BadRequestException();
          return { message: 'Comptoir modifier avec succès!', saved };
        }
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const pays = await this.findOne(id);
    if (pays) {
      const remove = await this.paysRepository.remove(pays);
      return { message: 'Pays supprimé avec succès!', remove };
    }
  }
}
