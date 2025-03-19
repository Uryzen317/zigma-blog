import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.model';
import { isValidObjectId, Model } from 'mongoose';
import { CommentDTO, CreatePostDTO, LoginDTO, SignUpDTO } from './app.DTO';
import { Role, User } from './user.model';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { Request, Response } from 'express';
import { CookieUser } from './interfaces/CookieUser.type';
import { Comment, CommentStatus } from './comment.model';
const argon2 = require('argon2');
const randomBytesPromise = promisify(randomBytes);

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Post.name) private posts: Model<Post>,
    @InjectModel(User.name) private users: Model<User>,
    @InjectModel(Comment.name) private comments: Model<Comment>,
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
    // console.log(
    //   await this.posts
    //     .find({}, { _id: true })
    //     .transform((docs) =>
    //       docs.map((doc) => 'http://localhost:3000/post/' + doc._id),
    //     ),
    // );

    if (!isValidObjectId(postID)) throw new NotFoundException();

    let post: Post & { _id: any; comments?: Array<Comment> } = await this.posts
      .findOneAndUpdate(
        { _id: postID },
        {
          $inc: { views: 1 },
        },
      )
      .populate({
        path: 'user',
        select: {
          username: true,
          roles: true,
        },
      })
      .lean();
    if (!post) throw new NotFoundException();

    // get comments
    post.comments = await this.comments
      .find({
        post: post._id,
        // status : CommentStatus.confirmed // TO DO
      })
      .populate({
        path: 'user',
        select: {
          username: true,
          roles: true,
        },
      })
      .sort({
        createdAt: 'desc',
      });

    return post;
  }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  // comment
  comment(cUser: CookieUser, commentDTO: CommentDTO) {
    const { postID, description } = commentDTO;
    const { _id } = cUser;

    if (!isValidObjectId(postID)) throw new BadRequestException();

    return this.comments.create({
      post: postID,
      user: _id,
      description,
    });
  }

  // get home
  async getHome() {
    const comments = await this.comments.aggregate([
      {
        $group: {
          _id: '$post',
        },
      },
    ]);

    const sections = await Promise.all([
      this.posts
        .find()
        .limit(4)
        .sort({ createdAt: 'desc' })
        .populate({
          path: 'user',
          select: {
            username: true,
            roles: true,
          },
        }), // most seen
      this.posts
        .find()
        .limit(4)
        .sort({ views: 'desc' })
        .populate({
          path: 'user',
          select: {
            username: true,
            roles: true,
          },
        }), // most popular
      this.comments.aggregate([
        {
          $group: {
            _id: '$post',
            count: {
              $sum: 1,
            },
          },
        },
        {
          $limit: 4,
        },
        {
          $lookup: {
            from: 'posts',
            as: 'post',
            let: {
              id: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$$id', '$_id'],
                  },
                },
              },
              {
                $lookup: {
                  from: 'users',
                  as: 'user',
                  localField: 'user',
                  foreignField: '_id',
                },
              },
              {
                $unwind: '$user',
              },
              {
                $project: {
                  title: true,
                  description: true,
                  picture: true,
                  views: true,
                  user: {
                    username: true,
                    roles: true,
                  },
                },
              },
            ],
          },
        },
        {
          $unwind: '$post',
        },
        {
          $sort: {
            count: 1,
          },
        },
        {
          $project: {
            _id: '$post._id',
            title: '$post.title',
            description: '$post.description',
            picture: '$post.picture',
            views: '$post.views',
            user: {
              username: '$post.user.username',
              roles: '$post.user.roles',
            },
          },
        },
      ]),
      this.posts
        .find()
        .limit(4)
        .sort({ createdAt: 'asc' })
        .populate({
          path: 'user',
          select: {
            username: true,
            roles: true,
          },
        }), // oldest
    ]);

    return {
      newest: sections[0],
      mostSeen: sections[1],
      mostPopular: sections[2],
      oldest: sections[3],
    };
  }

  // search
  async search(query: string) {
    if (!query) throw new NotFoundException();

    return this.posts
      .find({
        title: {
          $regex: query,
          $options: 'i',
        },
      })
      .limit(5)
      .populate({
        path: 'user',
        select: {
          username: true,
          roles: true,
        },
      });
  }
}
