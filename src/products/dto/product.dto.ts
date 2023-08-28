import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Configure {
  @IsString()
  @IsNotEmpty()
  ram: string;

  @IsString()
  @IsNotEmpty()
  hardDisk: string;

  @IsString()
  @IsNotEmpty()
  cpu: string;

  @IsString()
  @IsNotEmpty()
  screen: string;

  @IsString()
  @IsNotEmpty()
  battery: string;

  @IsString()
  @IsNotEmpty()
  os: string;

  @IsString()
  @IsNotEmpty()
  camera: string;

  @IsString()
  @IsNotEmpty()
  gpu: string;
}

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  instock: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsNotEmpty()
  @IsString()
  categories: string;

  @ValidateNested()
  configure: Configure;
}
