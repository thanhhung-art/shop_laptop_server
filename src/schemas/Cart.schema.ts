import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: String,
        quantity: { type: Number, default: 1 },
      },
    ],
  })
  products: {
    productId: string;
    quantity: number;
  }[];

  @Prop({ required: true })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
