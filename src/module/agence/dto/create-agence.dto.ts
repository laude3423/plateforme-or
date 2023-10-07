import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateAgenceDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une compte!' })
  @Type(() => Number)
  compteId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une commune!' })
  @Type(() => Number)
  communeId: number;

  @IsNotEmpty({ message: "Veuillez entrer le nom de l'agence!" })
  @IsString({
    message: "Le nom de l'agence est un chaine de caractère!",
  })
  nomResponsable: string;

  @IsNotEmpty({ message: "Veuillez entrer l'adresse de l'agence!" })
  @IsString({
    message: "L'adresse de l'agence est un chaine de caractère!",
  })
  adresseResponsable: string;

  @IsNotEmpty({
    message: "Veuillez entrer le numéro de cin de l'agence!",
  })
  @IsString()
  cinResponsable: string;

  @IsNotEmpty({ message: "Veuillez entrer le contact de l'agence!" })
  @IsString()
  contactResponsable: string;
}
