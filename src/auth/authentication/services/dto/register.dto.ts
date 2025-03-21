import { IsEmail, IsNotEmpty, IsOptional, MinLength, } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  // @MinLength(10)
  nik: string;

  @IsNotEmpty()
  bagian: string;

  @IsOptional()
  @IsNotEmpty()
  role?: string;
}
