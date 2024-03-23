import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from '../service/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CurrentUser } from 'src/modules/users/decorators/current_user.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AuthenticationGuard } from 'src/modules/users/guards/authentication.guard';
import { AuthorizationGuardMixin } from 'src/modules/users/guards/roles.guard';
import { Roles } from 'src/modules/users/utilities/user-roles.enum';
import { JSendSuccessResponse } from 'src/shared/core/api.response';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuardMixin([Roles.ADMIN]))
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: UserEntity,
  ): Promise<JSendSuccessResponse> {
    const response = await this.categoriesService.create(
      createCategoryDto,
      user,
    );

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        category: response,
      },
    };

    return data;
  }

  @Get()
  async findAll(): Promise<JSendSuccessResponse> {
    const response = await this.categoriesService.findAll();

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        categories: response,
      },
    };

    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JSendSuccessResponse> {
    const response = await this.categoriesService.findOne(id);

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        category: response,
      },
    };

    return data;
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuardMixin([Roles.ADMIN]))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const response = await this.categoriesService.update(id, updateCategoryDto);

    const data: JSendSuccessResponse = {
      status: 'success',
      message: `Category with id: ${id} is successfully submitted`,
      data: {
        category: response,
      },
    };

    return data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
