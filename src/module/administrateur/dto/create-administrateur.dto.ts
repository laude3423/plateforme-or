import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdministrateurDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une compte!' })
  @Type(() => Number)
  compteId: number;

  @IsNotEmpty({ message: "Veuillez entrer le nom de l'administrateur!" })
  @IsString({
    message: "Le nom de l'administrateur est un chaine de caractère!",
  })
  nomResponsable: string;

  @IsNotEmpty({ message: "Veuillez entrer l'adresse de l'administrateur!" })
  @IsString({
    message: "L'adresse de l'administrateur est un chaine de caractère!",
  })
  adresseResponsable: string;

  @IsNotEmpty({
    message: "Veuillez entrer le numéro de cin de l'administrateur!",
  })
  @IsString()
  cinResponsable: string;

  @IsNotEmpty({ message: "Veuillez entrer le contact de l'administrateur!" })
  @IsString()
  contactResponsable: string;
}
