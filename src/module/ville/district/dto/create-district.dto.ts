import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner la region!' })
  @Type(() => Number)
  regionId: number;

  @IsNotEmpty({ message: 'Veuillez ajouté la district!' })
  @IsString({ message: 'La district est une chaine de caractère!' })
  nomDistrict: string;
}
