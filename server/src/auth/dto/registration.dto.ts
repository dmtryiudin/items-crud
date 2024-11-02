import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
