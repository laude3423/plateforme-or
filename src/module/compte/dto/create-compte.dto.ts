import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompteDto {
  @IsNotEmpty({ message: "Veuillez entrer le nom d'utilisateur" })
  @IsString({ message: "Le nom d'utilisateur est un chaine de caractère!" })
  utilisateur: string;

  @IsNotEmpty({ message: "Veuillez entrer l'adresse email'" })
  @IsString({ message: "L'adresse email est un chaine de caractère!" })
  email: string;

  @IsNotEmpty({ message: 'Veuillez entrer le mot de passe' })
  motDePasse: string;

  @IsNotEmpty({ message: 'Veuillez entrer le chémin du photo' })
  photo: string;

  @IsNotEmpty({ message: "Veuillez entrer le rôle d'utilisateur" })
  @IsString({ message: "Le rôle d'utilisateur est un chaine de caractère!" })
  role: string;
}
