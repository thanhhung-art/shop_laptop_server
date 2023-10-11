import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/schemas/Cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  async createCart(cart: Cart) {
    const newCart = new this.cartModel(cart);

    return await newCart.save();
  }

  async getAll() {
    return await this.cartModel.find();
  }

  async getById(id: string) {
    return await this.cartModel.findById(id);
  }

  async deleteById(id: string) {
    await this.cartModel.findByIdAndDelete(id);
  }
}
