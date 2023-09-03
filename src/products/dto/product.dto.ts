import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Configure {
  @IsString()
  @IsOptional()
  ram: string;

  @IsString()
  @IsOptional()
  hardDisk: string;

  @IsString()
  @IsOptional()
  cpu: string;

  @IsString()
  @IsOptional()
  screen: string;

  @IsString()
  @IsOptional()
  battery: string;

  @IsString()
  @IsOptional()
  os: string;

  @IsString()
  @IsOptional()
  camera: string;

  @IsString()
  @IsOptional()
  gpu: string;
}

export class ProductDto {
  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsNotEmpty()
  instock: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  weight: string;

  @IsString()
  @IsOptional()
  categories: string;

  @ValidateNested()
  configure: Configure;
}
