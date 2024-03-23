import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';

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
    const category = await this.database.findOne({
      where: { id },
      relations: { added_by: true },
      select: {
        added_by: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!category) throw new NotFoundException('Category cannot be found');

    return category;
  }

  async read(): Promise<CategoryEntity[]> {
    return await this.database.find();
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.readById(id);
    if (!category) throw new NotFoundException('Category not found');
    if (!!dto) {
      throw new BadRequestException("Payload is not mean't to be empty");
    }

    Object.assign(category, dto);

    return await this.database.save(category);
  }
}
