import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderItemsDto, UpdateOrderItemsDto } from 'src/users/dtos/order-items.dto';
import { OrderItemsService } from 'src/users/services/order-items/order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private itemsService: OrderItemsService) {}

  @Post()
  create(@Body() payload: CreateOrderItemsDto) {
    return this.itemsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemsDto,
  ) {
    return this.itemsService.update(id, payload);
  }
}
