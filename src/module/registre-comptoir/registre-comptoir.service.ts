import { Injectable } from '@nestjs/common';
import { CreateRegistreComptoirDto } from './dto/create-registre-comptoir.dto';
import { UpdateRegistreComptoirDto } from './dto/update-registre-comptoir.dto';
import { ComptoirEntity } from '../comptoir/entities/comptoir.entity';
import { PayEntity } from '../pays/entities/pay.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RegistreComptoirEntity } from './entities/registre-comptoir.entity';
import { AnorEntity } from '../anor/entities/anor.entity';

@Injectable()
export class RegistreComptoirService {
  constructor(
    @InjectRepository(ComptoirEntity)
    private readonly comptoiRepository: Repository<ComptoirEntity>,
    @InjectRepository(PayEntity)
    private readonly paysRepository: Repository<PayEntity>,
    @InjectRepository(AnorEntity)
    private readonly anorRepository: Repository<AnorEntity>,
    @InjectRepository(RegistreComptoirEntity)
    private readonly registreComptoirRepository: Repository<RegistreComptoirEntity>,
  ) {}

  async create(createRegistreComptoirDto: CreateRegistreComptoirDto) {
    try {
      const { date, quantite, prix, paysId, comptoirId, anorId } =
        createRegistreComptoirDto;
      const existe = await this.registreComptoirRepository.findOne({
        where: { date, pays: { id: paysId } },
      });
      if (existe) {
        return { message: 'Ce collecteur existe déjà' };
      }
      const orpailleur = await this.registreComptoirRepository.create({
        date,
        quantite,
        prix,
        pays: { id: paysId },
        anor: { id: anorId },
      });
      const saved = await this.registreComptoirRepository.save(orpailleur);
      if (!saved) throw new BadRequestException('Orpailleur non ajouté!');
      return { message: 'Orpailleur ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const registre = await this.registreComptoirRepository
      .createQueryBuilder('registreComptoir')
      .leftJoinAndSelect('registreComptoir.comptoir', 'comptoir')
      .leftJoinAndSelect('registreComptoir.pays', 'pays')
      .leftJoinAndSelect('registreComptoir.anor', 'anor');
    return await registre.getMany();
  }

  async findOne(id: number) {
    const registre = await this.registreComptoirRepository.findOne({
      where: { id },
      relations: ['comptoir', 'pays', 'anor'],
    });
    if (!registre) throw new NotFoundException('Liste vide!');
    return registre;
  }

  async update(
    id: number,
    updateRegistreComptoirDto: UpdateRegistreComptoirDto,
  ) {
    try {
      const registre = await this.findOne(id);
      if (registre) {
        const { paysId, comptoirId } = updateRegistreComptoirDto;
        const existe = await this.registreComptoirRepository.findOne({
          where: { id: Not(id) },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cet registre existe déjà!' };
        }
        Object.assign(registre, updateRegistreComptoirDto);

        registre.pays = null;
        registre.comptoir = null;
        registre.anor = null;
        Object.assign(registre, updateRegistreComptoirDto);
        const newPays = await this.paysRepository.findOne({
          where: { id: paysId },
        });
        const newComptoir = await this.comptoiRepository.findOne({
          where: { id: comptoirId },
        });
        const newAnor = await this.anorRepository.findOne({
          where: { id: comptoirId },
        });
        if (!newComptoir) throw new NotFoundException('comptoir not found');
        if (!newPays) throw new NotFoundException('comptoir not found');
        registre.comptoir = newComptoir;
        registre.pays = newPays;
        registre.anor = newAnor;

        const saved = await this.registreComptoirRepository.save(registre);
        if (!saved) throw new BadRequestException();
        return { message: 'registre modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const registre = await this.findOne(id);
    if (registre) {
      const remove = await this.registreComptoirRepository.remove(registre);
      return { message: 'Registre supprimé avec succès!', remove };
    }
  }
}
