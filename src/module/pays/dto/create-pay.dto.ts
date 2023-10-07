import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePayDto {
  @IsNotEmpty({ message: 'Veuillez entrer le nom du pays!' })
  @IsString({ message: 'Le nom du pays est une chaine de caractère!' })
  nomPays: string;
}
