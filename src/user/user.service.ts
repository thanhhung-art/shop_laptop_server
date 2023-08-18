import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import { IDataToUpdate } from './types';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(newUsers: boolean) {
    if (newUsers) {
      return await this.userModel.find().sort({ _id: -1 }).limit(10);
    }

    return await this.userModel.find();
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) return 'user not found';

    return user;
  }

  async updateById(id: string, dataToUpdate: IDataToUpdate) {
    const prepareUpdate = {} as IDataToUpdate;

    for (const key in dataToUpdate) {
      if (dataToUpdate[key]) prepareUpdate[key] = dataToUpdate[key];
    }

    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: prepareUpdate },
      { new: true },
    );

    return user;
  }

  async deleteById(id: string) {
    await this.userModel.findByIdAndDelete(id);

    return 'user deleted';
  }

  async getUserAmount() {
    const users = await this.userModel.find();
    return users.length;
  }
}
