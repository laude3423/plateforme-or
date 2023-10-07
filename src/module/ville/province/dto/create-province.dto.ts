import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProvinceDto {
  @IsNotEmpty({ message: 'Veuillez entrer le nom de la région!' })
  @IsString({ message: 'Le province est une chaine de caractère!' })
  nomProvince: string;
}
