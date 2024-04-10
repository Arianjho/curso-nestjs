import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'all',
  ) {
    return {
      message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string) {
    return {
      message: `product with id ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Create action',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      id,
      message: 'Delete action',
    };
  }
}
