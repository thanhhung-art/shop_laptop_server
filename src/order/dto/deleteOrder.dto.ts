import { IsNotEmpty } from 'class-validator';

export class deleteOrdersDto {
  @IsNotEmpty()
  ids: string[];
}
