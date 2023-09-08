import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import * as jwt from 'jsonwebtoken';
import { AES, enc } from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private readonly jwt_secret = process.env.JWT_SECRET;
  async register(email: string, username: string, password: string) {
    const checkUser = await this.userModel.findOne({ email });
    if (checkUser) {
      return 'User already exists';
    }

    const user = new this.userModel({
      email,
      username,
      password: AES.encrypt(password, process.env.PASS_SECRET),
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { _id: savedUser._id, isadmin: savedUser.isadmin },
      this.jwt_secret,
      { expiresIn: '3d' },
    );

    return { data: savedUser, token };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return 'Email not found';
    }

    const decryptPass = AES.decrypt(
      user.password,
      process.env.PASS_SECRET,
    ).toString(enc.Utf8);

    if (decryptPass !== password) {
      return 'Invalid password';
    }

    const token = jwt.sign(
      { _id: user._id, isadmin: user.isadmin },
      this.jwt_secret,
      { expiresIn: '3d' },
    );

    return { data: user, token };
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwt_secret) as {
        _id: string;
        isadmin: boolean;
      };
      return decoded;
    } catch (error) {
      return 'token invalid';
    }
  }
}
