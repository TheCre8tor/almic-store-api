import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly database: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateCategoryDto,
    user: UserEntity,
  ): Promise<CategoryEntity> {
    const category = this.database.create(dto);
    category.added_by = user;
    return await this.database.save(category);
  }

  async readById(id: string): Promise<CategoryEntity> {
    return await this.database.findOneBy({ id });
  }

  async read(): Promise<CategoryEntity[]> {
    return await this.database.find();
  }
}
