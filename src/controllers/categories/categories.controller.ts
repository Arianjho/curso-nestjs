import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor() {}

  @Get()
  getCategories() {
    return 'All categories';
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return `This category has the id: ${id}`;
  }
}
