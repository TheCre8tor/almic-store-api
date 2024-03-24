import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repositories/products.repository.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CategoriesRepository } from 'src/modules/categories/repositories/categories.repository';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly repository: ProductsRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async create(createProductDto: CreateProductDto, user: UserEntity) {
    const categoryExist = await this.categoryRepository.readById(
      createProductDto.category_id,
    );

    if (!categoryExist) {
      throw new NotFoundException(
        'A category with the specified id cannot be found',
      );
    }

    return await this.repository.create(createProductDto, categoryExist, user);
  }

  async findAll(): Promise<ProductEntity[]> {
    const response = await this.repository.read();

    if (response.length === 0) return [];

    return response;
  }

  async findOne(id: string): Promise<ProductEntity> {
    const response = await this.repository.readById(id);

    if (!response) throw new NotFoundException('Product not found');

    return response;
  }

  async update(
    id: string,
    updateProductDto: Partial<UpdateProductDto>,
    user: UserEntity,
  ): Promise<ProductEntity> {
    const product = await this.findOne(id);

    Object.assign(product, updateProductDto);

    product.added_by = user;

    if (updateProductDto.category_id) {
      const category = await this.categoryRepository.readById(
        updateProductDto.category_id,
      );
      product.category = category;
    }

    return await this.repository.update(product);
  }

  async remove(id: string): Promise<ProductEntity> {
    const product = await this.findOne(id);
    if (product) return await this.repository.delete(id);
  }
}
