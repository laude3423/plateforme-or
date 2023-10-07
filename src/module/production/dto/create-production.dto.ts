import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductionDto {
  @IsInt()
  @IsNotEmpty({ message: 'Veuillez séléctionner un orpailleur!' })
  @Type(() => Number)
  orpailleursId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateProduction: Date;

  @IsNumber()
  quantite: number;
}
