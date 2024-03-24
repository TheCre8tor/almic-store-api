import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'title cannot be empty' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'description cannot be empty' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'price should not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price should be number & max decimal precision 2' },
  )
  @IsPositive()
  price: number;

  @IsNotEmpty({ message: 'stock should not be empty' })
  @IsNumber({}, { message: 'stock should be number' })
  @Min(0, { message: 'stock can not be negative' })
  stock: number;

  @IsNotEmpty({ message: 'images should not be empty.' })
  @IsArray({ message: 'images should be in array format' })
  images: string[];

  @IsNotEmpty({ message: 'category id should not be empty' })
  @IsString({ message: 'category id should be a string' })
  category_id: string;
}
