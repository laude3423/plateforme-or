import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateRegistreComptoirDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner un anor!' })
  @Type(() => Number)
  anorId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner un pays!' })
  @Type(() => Number)
  paysId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner un comptoir!' })
  @Type(() => Number)
  comptoirId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsNumber()
  quantite: number;

  @IsNumber()
  prix: number;
}
