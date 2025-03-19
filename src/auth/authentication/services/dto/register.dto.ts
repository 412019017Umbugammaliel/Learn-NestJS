import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  nik: string;

  @IsNotEmpty()
  bagian: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
