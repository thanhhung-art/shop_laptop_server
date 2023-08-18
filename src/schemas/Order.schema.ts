import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop()
  phone: string;

  @Prop()
  username: string;

  @Prop({
    type: [
      {
        productId: String,
        quantity: { type: Number, default: 1 },
        name: String,
        img: String,
      },
    ],
  })
  products: {
    productId: string;
    quantity: number;
    name: string;
    img: string;
  }[];

  @Prop()
  amount: number;

  @Prop()
  address: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  payment: string;

  @Prop()
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
