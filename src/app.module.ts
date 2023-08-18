import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    UserModule,
    CartModule,
    OrderModule,
    ProductsModule,
  ],
})
export class AppModule {}
