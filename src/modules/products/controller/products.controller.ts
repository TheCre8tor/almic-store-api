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
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AuthenticationGuard } from 'src/modules/users/guards/authentication.guard';
import { AuthorizationGuardMixin } from 'src/modules/users/guards/roles.guard';
import { Roles } from 'src/modules/users/utilities/user-roles.enum';
import { CurrentUser } from 'src/modules/users/decorators/current_user.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JSendSuccessResponse } from 'src/shared/core/api.response';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuardMixin([Roles.ADMIN]))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  async findAll(): Promise<JSendSuccessResponse> {
    const response = await this.productsService.findAll();

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        products: response,
      },
    };

    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JSendSuccessResponse> {
    const response = await this.productsService.findOne(id);

    const data: JSendSuccessResponse = {
      status: 'success',
      data: {
        product: response,
      },
    };

    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
