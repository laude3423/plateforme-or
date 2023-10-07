import { Injectable } from '@nestjs/common';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AdministrateurEntity } from './entities/administrateur.entity';
import { CompteEntity } from '../compte/entities/compte.entity';

@Injectable()
export class AdministrateurService {
  constructor(
    @InjectRepository(AdministrateurEntity)
    private readonly adminRepository: Repository<AdministrateurEntity>,
    @InjectRepository(CompteEntity)
    private readonly compteRepository: Repository<CompteEntity>,
  ) {}
  async create(createAdministrateurDto: CreateAdministrateurDto) {
    try {
      const {
        nomResponsable,
        adresseResponsable,
        cinResponsable,
        contactResponsable,
        compteId,
      } = createAdministrateurDto;
      const existe = await this.adminRepository.findOne({
        where: {
          cinResponsable,
          compte: { id: compteId },
        },
      });
      if (existe) {
        return { message: 'Cette personne existe déjà' };
      }
      const admin = await this.adminRepository.create({
        nomResponsable,
        adresseResponsable,
        cinResponsable,
        contactResponsable,
        compte: { id: compteId },
      });
      const saved = await this.adminRepository.save(admin);
      if (!saved) throw new BadRequestException('Administrateur non ajouté!');
      return { message: 'Administrateur ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const admin = await this.adminRepository
      .createQueryBuilder('administrateur')
      .leftJoinAndSelect('administrateur.compte', 'compte');
    return await admin.getMany();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: ['compte'],
    });
    if (!admin) throw new NotFoundException('Liste vide!');
    return admin;
  }

  async update(id: number, updateAdministrateurDto: UpdateAdministrateurDto) {
    try {
      const admin = await this.findOne(id);
      if (admin) {
        const { nomResponsable, compteId, cinResponsable, contactResponsable } =
          updateAdministrateurDto;
        const existe = await this.adminRepository.findOne({
          where: {
            cinResponsable,
            compte: { id: compteId },
          },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cet admin existe déjà!' };
        }
        Object.assign(admin, updateAdministrateurDto);

        admin.compte = null;
        Object.assign(admin, updateAdministrateurDto);
        const newCompte = await this.compteRepository.findOne({
          where: { id: compteId },
        });
        if (!newCompte) throw new NotFoundException('comptoir not found');
        admin.compte = newCompte;

        const saved = await this.adminRepository.save(admin);
        if (!saved) throw new BadRequestException();
        return { message: 'Administrateur modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    if (admin) {
      const remove = await this.adminRepository.remove(admin);
      return { message: 'Admin supprimé avec succès!', remove };
    }
  }
}
