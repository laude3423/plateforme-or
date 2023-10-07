import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateAnorDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une compte!' })
  @Type(() => Number)
  compteId: number;

  @IsNotEmpty({ message: "Veuillez entrer le nom de l'anor!" })
  @IsString({
    message: "Le nom de l'anor est un chaine de caractère!",
  })
  nomResponsable: string;

  @IsNotEmpty({ message: "Veuillez entrer l'adresse de l'anor!" })
  @IsString({
    message: "L'adresse de l'anor est un chaine de caractère!",
  })
  adresseResponsable: string;

  @IsNotEmpty({
    message: "Veuillez entrer le numéro de cin de l'anor!",
  })
  @IsString()
  cinResponsable: string;

  @IsNotEmpty({ message: "Veuillez entrer le contact de l'anor!" })
  @IsString()
  contactResponsable: string;
}
