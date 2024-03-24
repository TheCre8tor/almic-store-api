import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CreateReviewDto } from 'src/modules/reviews/dto/create-review.dto';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepository: Repository<ReviewEntity>,
  ) {}

  async create(
    dto: CreateReviewDto,
    product: ProductEntity,
    user: UserEntity,
  ): Promise<ReviewEntity> {
    const entity = this.reviewsRepository.create(dto);

    entity.product = product;
    entity.user = user;

    return await this.reviewsRepository.save(entity);
  }

  async save(review: ReviewEntity): Promise<ReviewEntity> {
    return await this.reviewsRepository.save(review);
  }

  async readByUserAndProductId(
    user_id: string,
    product_id: string,
  ): Promise<ReviewEntity> {
    return await this.reviewsRepository.findOne({
      where: {
        user: { id: user_id },
        product: { id: product_id },
      },
      relations: { user: true, product: { category: true } },
    });
  }
}
