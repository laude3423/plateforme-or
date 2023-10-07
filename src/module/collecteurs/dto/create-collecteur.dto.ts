import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCollecteurDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une commune!' })
  @Type(() => Number)
  communeId: number;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  numeroIdentification: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString({ message: 'Le nom est une chaine de caractère!' })
  nom: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString({ message: 'Le prénom est une chaine de caractère!' })
  prenom: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  adresse: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString({ message: 'Le sexe est une chaine de caractère!' })
  sexe: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  cin: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateCin: Date;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString({ message: 'Le lieu de cin est une chaine de caractère!' })
  lieuCin: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString()
  validateAnnee: string;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString({ message: "Le lieu d'octroit est une chaine de caractère!" })
  lieuOctroit: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOctroit: Date;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString({ message: 'La nom est une chaine de caractère!' })
  photo: string;

  @IsString({ message: 'Le lien est une chaine de caractère!' })
  attestation: string;

  @IsNumber()
  stockCollecteur: number;
}
