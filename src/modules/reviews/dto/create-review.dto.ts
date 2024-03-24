import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Ratings should not be empty.' })
  ratings: number;

  @IsString()
  @IsNotEmpty({ message: 'Comment should not be empty.' })
  comment: string;

  @IsUUID('4', { message: 'Product id should be a valid UUID string' })
  @IsNotEmpty({ message: 'Product id should not be empty.' })
  product_id: string;
}
