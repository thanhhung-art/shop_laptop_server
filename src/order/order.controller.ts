import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { dataReturn } from 'src/utils/dataReturn';
import { OrderUpdateDto } from './dto/orderUpdate.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    const result = await this.orderService.getAll();
    return dataReturn('get all order success', result);
  }

  @Post()
  async createOrder(@Body() order: OrderDto) {
    const result = await this.orderService.createOrder(order);
    return dataReturn('create order success', result);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() order: OrderUpdateDto) {
    const result = await this.orderService.updateOrder(id, order);
    return dataReturn('update order suscess', result);
  }
}
