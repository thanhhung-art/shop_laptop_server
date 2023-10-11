import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAll() {
    return this.orderService.getAll();
  }

  @Post()
  createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }
}
