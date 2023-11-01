import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { dataReturn } from 'src/utils/dataReturn';
import { Product } from 'src/schemas/Product.schema';

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

  @Get()
  async getProducts(
    @Query('page', ParseIntPipe) page: number,
    @Query('latest') latest: string,
    @Query('brand') brand: string,
    @Query('featured') featured: string,
  ) {
    let result:
      | Product[]
      | { products: Product[]; nextPage: number; lastPage: number };
    if (latest) result = await this.productsService.getAll({ latest });
    else if (brand) result = await this.productsService.getAll({ brand });
    else if (featured) result = await this.productsService.getAll({ featured });
    else result = await this.productsService.getAll({ page });

    return dataReturn('get products success', result);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const result = await this.productsService.getById(id);

    return dataReturn('get product success', result);
  }

  @Put(':id')
  async editProduct(@Param('id') id: string, @Body() productData: ProductDto) {
    const result = await this.productsService.editProduct(id, productData);

    return dataReturn('update success', result);
  }
}
