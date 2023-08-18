import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { dataReturn } from 'src/utils/dataReturn';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() productInfo: ProductDto) {
    const result = await this.productsService.addProduct(productInfo);
    if (result === 'product have been exist already')
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    return dataReturn('add product success', result);
  }
}
