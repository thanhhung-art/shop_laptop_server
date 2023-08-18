import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        userId: String,
        review: String,
        rating: Number,
        name: String,
        replies: [
          {
            reply: String,
            name: String,
            userId: String,
          },
        ],
      },
    ],
  })
  reviews: {
    userId: string;
    review: string;
    rating: number;
    name: string;
    replies: {
      reply: string;
      name: string;
      userId: string;
    }[];
  }[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
