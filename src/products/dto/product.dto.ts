import {
  IsArray,
  IsBoolean,
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

  @IsArray()
  @IsNotEmpty()
  color: string[];

  @IsBoolean()
  @IsNotEmpty()
  instock: boolean;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsArray()
  @IsString()
  categories: string[];

  @ValidateNested()
  configure: Configure;
}
