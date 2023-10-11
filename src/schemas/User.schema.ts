import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isadmin: boolean;

  @Prop()
  img: string;

  @Prop()
  address: string;

  @Prop()
  address2: string;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
