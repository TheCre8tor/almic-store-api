import { Module } from '@nestjs/common';
import { ReviewsService } from './service/reviews.service';
import { ReviewsController } from './controller/reviews.controller';
import { ReviewsRepository } from './repositories/reviews.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), ProductsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
})
export class ReviewsModule {}
