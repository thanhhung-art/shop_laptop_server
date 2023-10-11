import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getAll() {
    return this.cartService.getAll();
  }
}
