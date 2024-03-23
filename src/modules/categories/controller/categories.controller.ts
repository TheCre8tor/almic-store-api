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

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuardMixin([Roles.ADMIN]))
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.categoriesService.create(createCategoryDto, user);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
