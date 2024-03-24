import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repositories/products.repository.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CategoriesRepository } from 'src/modules/categories/repositories/categories.repository';

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

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
