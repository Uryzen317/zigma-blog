import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.model';
import { Model, ObjectId } from 'mongoose';
import { CreatePostDTO, LoginDTO, SignUpDTO } from './app.DTO';
import { Role, Roles, User } from './user.model';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { Request, Response } from 'express';
import { json } from 'stream/consumers';
import { CookieUser } from './interfaces/CookieUser.type';
const argon2 = require('argon2');
const randomBytesPromise = promisify(randomBytes);

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Post.name) private posts: Model<Post>,
    @InjectModel(User.name) private users: Model<User>,
  ) {}

  public PASS_REGEX = /^[A-Za-z0-9_]{8,64}$/;

  // create post
  createPost(
    createPostDTO: CreatePostDTO,
    file: Express.Multer.File,
    req: Request,
  ) {
    const { title, description, tags } = createPostDTO;
    const { filename } = file;

    const user: CookieUser = JSON.parse(
      req.signedCookies['zigma-mainnet-auth'],
    );

    return this.posts.create({
      title,
      description,
      tags,
      picture: filename,
      user: user._id,
    });
  }

  // sign up
  async signUp(signUpDTO: SignUpDTO, res: Response) {
    let { username, password } = signUpDTO;
    password = password.trim();

    // is pass valid
    if (!RegExp(this.PASS_REGEX).test(password))
      throw new BadRequestException('رمز عبور صحیح نیست');

    // is username unique
    if (await this.users.findOne({ username }, { _id: true }))
      throw new BadRequestException('نام کاربری قبلا ثبت شده است');

    try {
      const salt = await randomBytesPromise(8);
      const hash = await argon2.hash(password, {
        secret: salt,
      });
      await this.users.create({
        username,
        password: hash,
        salt: salt.toString('hex'),
        roles: [Role.user],
      });
    } catch (_err) {
      throw new BadRequestException('خطایی رخ داد');
    }

    // set the cookie
    res.cookie('auth', 'auth');

    return {
      success: true,
    };
  }

  // login
  async login(loginDTO: LoginDTO, res: Response) {
    let { username, password } = loginDTO;
    password = password.trim();

    // is pass valid
    if (!RegExp(this.PASS_REGEX).test(password))
      throw new BadRequestException('رمز عبور صحیح نیست');

    // is username unique
    const user = await this.users.findOne({ username });
    if (!user) throw new BadRequestException('حساب کاربری وجود ندارد');

    try {
      const isValid = await argon2.verify(user.password, password, {
        secret: Buffer.from(user.salt, 'hex'),
      });
      if (!isValid) throw new Error();
    } catch (_err) {
      throw new BadRequestException('اطلاعات ورود صحیح نیست');
    }

    // set the cookie
    res.cookie(
      'zigma-mainnet-auth',
      JSON.stringify({
        _id: user._id,
        username: user.username,
        roles: user.roles,
      }),
      {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        signed: true,
      },
    );

    return {
      success: true,
    };
  }

  async getPost(postID: string) {
    return this.posts.findOne({ _id: postID }).populate({
      path: 'user',
      select: {
        username: true,
        roles: true,
      },
    });
  }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
