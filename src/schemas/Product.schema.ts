import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  brand: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  img: string;

  @Prop()
  categories: string;

  @Prop({
    type: {
      ram: String,
      hardDisk: String,
      cpu: String,
      gpu: String,
      screen: String,
      battery: String,
      os: String,
      camera: String,
    },
  })
  configure: {
    ram: string;
    hardDisk: string;
    cpu: string;
    gpu: string;
    screen: string;
    battery: string;
    os: string;
    camera: string;
  };

  @Prop()
  color: string;

  @Prop()
  instock: string;

  @Prop()
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
