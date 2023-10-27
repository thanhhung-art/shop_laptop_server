import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Products {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class OrderDto {
  @IsString()
  userId: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  email: string;

  @ValidateNested()
  products: Products[];

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  address2: string;

  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  payment: string;

  @IsString()
  note: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
