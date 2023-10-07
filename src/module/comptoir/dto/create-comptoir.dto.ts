import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateComptoirDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une compte!' })
  @Type(() => Number)
  compteId: number;

  @IsNotEmpty({ message: 'Veuillez entrer le nom de la société!' })
  @IsString({ message: 'Le nom de la société est un chaine de caractère!' })
  nomSociete: string;

  @IsNotEmpty({ message: "Veuillez entrer l'adresse du société!" })
  @IsString({ message: "L'adresse de la société est un chaine de caractère!" })
  adresse: string;

  @IsNotEmpty({ message: 'Veuillez entrer le nif Stat!' })
  @IsString({ message: 'Le nif stat est un chaine de caractère!' })
  nifStat: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOuverture: Date;

  @IsNotEmpty({ message: 'Veuillez entrer le nom du directeur!' })
  @IsString({ message: "Le lieu d'achat/vente est un chaine de caractère!" })
  directeur: string;

  @IsNotEmpty({ message: 'Veuillez entrer la validation!' })
  @IsString()
  validation: string;

  @IsNumber()
  stockComptoir: number;

  @IsNotEmpty({ message: "Veuillez entrer l'arrêté!" })
  @IsString({ message: "L'arrêté est un chaine de caractère!" })
  arrete: string;
}
