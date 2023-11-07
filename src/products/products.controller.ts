import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { dataReturn } from 'src/utils/dataReturn';
import { Product } from 'src/schemas/Product.schema';
import { GetProductsPipe } from './pipes/getProducts.pipe';

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
    @Query('query', GetProductsPipe)
    query: 'latest' | 'brand' | 'featured' | number,
  ) {
    const result:
      | Product[]
      | { products: Product[]; nextPage: number; lastPage: number } =
      await this.productsService.getAll({ query });

    return dataReturn('get products success', result);
  }

  @Get('/search')
  async searchProducts(@Query('keyword') keyword: string) {
    const result = await this.productsService.search(keyword);

    return dataReturn('products found', result);
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
