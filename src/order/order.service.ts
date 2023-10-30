import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/Order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getAll() {
    return await this.orderModel.find();
  }

  async createOrder(order: Order) {
    const newOrder = new this.orderModel(order);

    return await newOrder.save();
  }

  async updateOrder(id: string, data) {
    const orderUpdated = await this.orderModel.findByIdAndUpdate(id, data);
    return orderUpdated;
  }
}
