import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/Order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getAll(query: string) {
    if (query === 'latest') {
      return await this.orderModel
        .find()
        .sort({
          createdAt: -1,
        })
        .limit(6);
    }
    return await this.orderModel.find();
  }

  async createOrder(order: Order) {
    const newOrder = new this.orderModel(order);

    return await newOrder.save();
  }

  async getOrdersOfUser(userId: string, phone: string, email: string) {
    const allOrders = await this.orderModel.find({
      $or: [{ userId }, { phone }, { email }],
    });
    return allOrders;
  }

  async updateOrder(id: string, data) {
    const orderUpdated = await this.orderModel.findByIdAndUpdate(id, data);
    return orderUpdated;
  }

  async deleteOrders(ids: string[]) {
    if (ids.length > 0) {
      if (ids.length > 1) {
        const filter = { _id: { $in: ids } };
        await this.orderModel.deleteMany(filter);
        return 'delete orders success';
      }

      await this.orderModel.findByIdAndDelete(ids[0]);
      return 'delete order success';
    }
    return 'no order to delete';
  }
}
