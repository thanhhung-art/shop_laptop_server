import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class GetProductsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string' && value === '')
      throw new BadRequestException("query can't be empty");
    if (typeof value !== 'number' && typeof value !== 'string') {
      throw new BadRequestException(
        'Invalid query parameter. It should be either a number or a string.',
      );
    }
    if (Number.isNaN(Number(value))) {
      return value;
    }

    return Number(value);
  }
}
