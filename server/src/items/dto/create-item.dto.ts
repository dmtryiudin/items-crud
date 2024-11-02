import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
