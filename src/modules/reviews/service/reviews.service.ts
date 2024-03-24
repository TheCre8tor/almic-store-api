import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ReviewsRepository } from '../repositories/reviews.repository';
import { ProductsService } from 'src/modules/products/service/products.service';
import { ReviewEntity } from '../entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly productsService: ProductsService,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    user: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productsService.findOne(
      createReviewDto.product_id,
    );

    let review = await this.reviewsRepository.readByUserAndProductId(
      user.id,
      product.id,
    );

    if (review) {
      review.ratings = createReviewDto.ratings;
      review.comment = createReviewDto.comment;
      return await this.reviewsRepository.save(review);
    }

    return await this.reviewsRepository.create(createReviewDto, product, user);
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
