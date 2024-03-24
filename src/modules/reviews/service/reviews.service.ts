import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(product_id: string): Promise<ReviewEntity[]> {
    const reviews = await this.reviewsRepository.read(product_id);

    if (reviews.length === 0) return [];

    return reviews;
  }

  async findOne(id: string): Promise<ReviewEntity> {
    const review = await this.reviewsRepository.readById(id);

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }
}
