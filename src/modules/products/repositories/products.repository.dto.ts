import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CategoriesRepository } from 'src/modules/categories/repositories/categories.repository';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly database: Repository<ProductEntity>,
  ) {}

  async create(
    dto: CreateProductDto,
    category: CategoryEntity,
    user: UserEntity,
  ) {
    const product = this.database.create(dto);

    Object.assign(product, { category, added_by: user });

    return await this.database.save(product);
  }

  async readById(id: string): Promise<ProductEntity> {
    return await this.database.findOne({
      where: { id },
      relations: { added_by: true, category: true },
      select: {
        added_by: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          title: true,
          description: true,
        },
      },
    });
  }

  async read(): Promise<ProductEntity[]> {
    return await this.database.find({
      relations: { added_by: true, category: true },
      select: {
        added_by: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          title: true,
          description: true,
        },
      },
    });
  }

  async delete(id: string): Promise<any> {
    const product = await this.readById(id);

    if (!product) {
      throw new NotFoundException("You can't delete what doesn't exist");
    }

    await this.database.softDelete(id);
  }
}
