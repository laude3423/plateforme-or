import { Injectable } from '@nestjs/common';
import { CreateCollecteurDto } from './dto/create-collecteur.dto';
import { UpdateCollecteurDto } from './dto/update-collecteur.dto';
import { CollecteurEntity } from './entities/collecteur.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommuneEntity } from '../ville/commune/entities/commune.entity';

@Injectable()
export class CollecteursService {
  constructor(
    @InjectRepository(CollecteurEntity)
    private readonly collecteurRepository: Repository<CollecteurEntity>,
    @InjectRepository(CommuneEntity)
    private readonly communeRepository: Repository<CommuneEntity>,
  ) {}
  async create(createCollecteurDto: CreateCollecteurDto) {
    try {
      const {
        numeroIdentification,
        nom,
        prenom,
        adresse,
        sexe,
        cin,
        dateCin,
        lieuCin,
        validateAnnee,
        lieuOctroit,
        dateOctroit,
        photo,
        stockCollecteur,
        attestation,
        communeId,
      } = createCollecteurDto;
      const existe = await this.collecteurRepository.findOne({
        where: { cin },
      });
      if (existe) {
        return { message: 'Ce collecteur existe déjà' };
      }
      const orpailleur = await this.collecteurRepository.create({
        numeroIdentification,
        nom,
        prenom,
        adresse,
        sexe,
        cin,
        dateCin,
        lieuCin,
        validateAnnee,
        lieuOctroit,
        dateOctroit,
        photo,
        attestation,
        stockCollecteur,
        commune: { id: communeId },
      });
      const saved = await this.collecteurRepository.save(orpailleur);
      if (!saved) throw new BadRequestException('Orpailleur non ajouté!');
      return { message: 'Orpailleur ajouté avec succès!', saved };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAll() {
    const collecteurs = await this.collecteurRepository
      .createQueryBuilder('collecteurs')
      .leftJoinAndSelect('collecteurs.commune', 'commune');
    return await collecteurs.getMany();
  }

  async findOne(id: number) {
    const collecteur = await this.collecteurRepository.findOne({
      where: { id },
      relations: ['commune'],
    });
    if (!collecteur) throw new NotFoundException('Liste vide!');
    return collecteur;
  }

  async update(id: number, updateCollecteurDto: UpdateCollecteurDto) {
    try {
      const collecteur = await this.findOne(id);
      if (collecteur) {
        const { communeId, cin } = updateCollecteurDto;
        const existe = await this.collecteurRepository.findOne({
          where: { cin, id: Not(id) },
        });
        if (existe && existe.id !== id) {
          return { message: 'Cet collecteur existe déjà!' };
        }
        Object.assign(collecteur, updateCollecteurDto);

        collecteur.commune = null;
        Object.assign(collecteur, updateCollecteurDto);
        const newCommune = await this.communeRepository.findOne({
          where: { id: communeId },
        });
        if (!newCommune) throw new NotFoundException('Commune not found');
        collecteur.commune = newCommune;

        const saved = await this.collecteurRepository.save(collecteur);
        if (!saved) throw new BadRequestException();
        return { message: 'Collecteur modifier avec succès!', saved };
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async remove(id: number) {
    const collecteur = await this.findOne(id);
    if (collecteur) {
      const remove = await this.collecteurRepository.remove(collecteur);
      return { message: 'Orpailleur supprimé avec succès!', remove };
    }
  }
}
