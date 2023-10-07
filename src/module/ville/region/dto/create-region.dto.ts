import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner une direction!' })
  @Type(() => Number)
  provinceId: number;

  @IsNotEmpty({ message: 'Veuillez entrer le nom de la région!' })
  @IsString({ message: 'La région est une chaine de caractère!' })
  nomRegion: string;
}
