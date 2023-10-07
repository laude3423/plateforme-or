import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrpailleurDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une commune!' })
  @Type(() => Number)
  communeId: number;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  numeroIdentification: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  nom: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  prenom: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  adresse: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  sexe: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  cin: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateCin: Date;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  lieuCin: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  validateAnnee: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  lieuOctroit: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOctroit: Date;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  photo: string;

  @IsNumber()
  stockOrpailleur: number;
}
