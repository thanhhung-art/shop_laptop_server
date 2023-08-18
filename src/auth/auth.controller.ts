import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { dataReturn } from 'src/utils/dataReturn';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('/register')
  async register(@Body() registerInfo: RegisterDto, @Res() res: Response) {
    const result = await this.authServices.register(
      registerInfo.email,
      registerInfo.username,
      registerInfo.password,
    );

    if (result === 'User already exists') {
      throw new HttpException(result, HttpStatus.FOUND);
    }

    res.cookie('authtoken', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    });

    return dataReturn('register success', result.data);
  }

  @Post('/login')
  async login(@Body() loginInfo: LoginDto, @Res() res: Response) {
    const result = await this.authServices.login(
      loginInfo.email,
      loginInfo.password,
    );

    if (result === 'Email not found') {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }

    if (result === 'Invalid password') {
      throw new HttpException(result, HttpStatus.FORBIDDEN);
    }

    res.cookie('authtoken', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    });

    return res.json(dataReturn('login success', result.data));
  }

  @Get('/logout')
  logout(@Req() req: Request, res: Response) {
    const token: string | undefined = req.cookies.authtoken;

    if (!token)
      throw new HttpException('something went wrong!', HttpStatus.BAD_REQUEST);

    res.clearCookie('authtoken');
    return dataReturn('logout success');
  }

  @Get('/checkauth')
  checkAuth(@Req() req: Request) {
    const token = req.cookies.authtoken;
    const result = this.authServices.verifyToken(token);

    if (result === 'token invalid')
      throw new HttpException(result, HttpStatus.FORBIDDEN);

    if (result.isadmin) return { isadmin: true, isuser: false };

    return { isuser: true, isadmin: false };
  }
}
