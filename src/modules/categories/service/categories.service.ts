import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity,
  ): Promise<CategoryEntity> {
    return await this.repository.create(createCategoryDto, user);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
