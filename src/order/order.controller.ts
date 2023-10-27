import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { dataReturn } from 'src/utils/dataReturn';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    const result = await this.orderService.getAll();
    return dataReturn('get all order success', result);
  }

  @Post()
  createOrder(@Body() order: OrderDto) {
    return dataReturn(
      'create order success',
      this.orderService.createOrder(order),
    );
  }
}
