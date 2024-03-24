import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReviewsService } from '../service/reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { CurrentUser } from 'src/modules/users/decorators/current_user.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AuthenticationGuard } from 'src/modules/users/guards/authentication.guard';
import { JSendSuccessResponse } from 'src/shared/core/api.response';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: UserEntity,
  ): Promise<JSendSuccessResponse> {
    const response = await this.reviewsService.create(createReviewDto, user);

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        review: response,
      },
    };

    return data;
  }

  @Get()
  async findAll(
    @Query('product_id') product_id: string,
  ): Promise<JSendSuccessResponse> {
    const response = await this.reviewsService.findAll(product_id);

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        reviews: response,
      },
    };

    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JSendSuccessResponse> {
    const response = await this.reviewsService.findOne(id);

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        review: response,
      },
    };

    return data;
  }
}
