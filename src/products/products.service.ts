import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/Product.schema';
import { IFilterProducts, IProduct } from './types';
import { uploadImage } from 'src/utils/uploadImage';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAll({ latest, brand, featured, page }: IFilterProducts) {
    let products = [] as Product[];
    if (page) {
      products = await this.productModel.find();
      //.limit(9)
      //.skip(page * 9);
      return products;
    } else if (latest) {
      products = await this.productModel
        .find()
        .sort({
          createdAt: -1,
        })
        .limit(6);
      return products;
    } else if (brand) {
      products = await this.productModel.find({
        brand: brand,
      });
      return products;
    } else if (featured) {
      products = await this.productModel
        .find()
        .sort({
          price: -1,
        })
        .limit(4);
      return products;
    } else {
      products = await this.productModel.find();
      return products;
    }
  }

  async getById(id: string) {
    return await this.productModel.findById(id);
  }

  async addProduct(product: IProduct) {
    const newProduct = new this.productModel(product);

    const checkProduct = await this.productModel.findOne({
      name: newProduct.name,
    });

    if (checkProduct) {
      return 'product have been exist already';
    }
    const linkImg = (await uploadImage(product.img)).secure_url;
    newProduct.img = linkImg;

    const savedProduct = await newProduct.save();

    return savedProduct;
  }
}
