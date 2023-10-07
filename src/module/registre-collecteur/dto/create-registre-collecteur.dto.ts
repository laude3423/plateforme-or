import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateRegistreCollecteurDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une agence!' })
  @Type(() => Number)
  agenceId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner un comptoir!' })
  @Type(() => Number)
  comptoirId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner un collecteur!' })
  @Type(() => Number)
  collecteurId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsNumber()
  quantite: number;

  @IsNumber()
  prix: number;

  @IsNotEmpty({ message: "Veuillez entrer le numéro d'indentification!" })
  @IsString({ message: "Le lieu d'achat/vente est un chaine de caractère!" })
  lieu: string;
}
