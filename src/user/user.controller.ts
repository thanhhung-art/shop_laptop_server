import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { dataReturn } from 'src/utils/dataReturn';
import { UpdateUserDto } from './dto/update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get()
  async getAll(@Query() query) {
    const isNew = query.new === 'true';
    const result = await this.userServices.getAll(isNew);

    return dataReturn('get all user success', result);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.userServices.getById(id);

    if (result === 'user not found') {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }

    return dataReturn('get user by id success', result);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userServices.updateById(id, updateUserDto);

    return dataReturn('update success', result);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const result = await this.userServices.deleteById(id);

    return dataReturn(result);
  }
}
