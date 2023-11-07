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

  async getAll({ query }: IFilterProducts) {
    const allProduct = (await this.productModel.find()).length;
    let products = [] as Product[];
    if (typeof query === 'number') {
      products = await this.productModel
        .find()
        .limit(12)
        .skip(query * 12);
      return {
        products,
        nextPage: query + 1,
        lastPage: Math.ceil(allProduct / 12),
      };
    } else if (query === 'latest') {
      products = await this.productModel
        .find()
        .sort({
          createdAt: -1,
        })
        .limit(6);
      return products;
    } else if (query === 'brand') {
      products = await this.productModel.find({
        brand: query,
      });
      return products;
    } else if (query === 'featured') {
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

  async search(keyword: string) {
    if (!keyword) return [];
    const regex = new RegExp(keyword, 'i');
    const producstFound = await this.productModel.find({
      name: { $regex: regex },
    });

    return producstFound.map((p) => {
      const { _id, name, img } = p;
      return { _id, name, img };
    });
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

  async editProduct(id: string, data: IProduct) {
    const productUpdated = await this.productModel.findByIdAndUpdate(id, data);

    return productUpdated;
  }
}
