import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
  HttpCode,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de productos' })
  getAll(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryByProduct(id, categoryId);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
