import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Products {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}

export class OrderUpdateDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @ValidateNested()
  @IsOptional()
  products: Products[];

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  address2: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  payment: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsNumber()
  @IsOptional()
  totalPrice: number;
}
