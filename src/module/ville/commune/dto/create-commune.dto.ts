import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommuneDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner la dictrict!' })
  @Type(() => Number)
  districtId: number;

  @IsNotEmpty({ message: 'Veuillez ajouté la district!' })
  @IsString({ message: 'La commune est une chaine de caractère!' })
  nomCommune: string;
}
