import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './models/post.model';
import { isValidObjectId, Model } from 'mongoose';
import { CommentDTO, CreatePostDTO, LoginDTO, SignUpDTO } from './DTOs/app.DTO';
import { Role, User } from './models/user.model';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { Request, Response } from 'express';
import { CookieUser } from './interfaces/CookieUser.type';
import { Comment, CommentStatus } from './models/comment.model';
import { join } from 'path';
import { Cron, CronExpression } from '@nestjs/schedule';
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

    let user: User;
    try {
      const salt = await randomBytesPromise(8);
      const hash = await argon2.hash(password, {
        secret: salt,
      });
      user = await this.users.create({
        username,
        password: hash,
        salt: salt.toString('hex'),
        roles: [Role.user],
      });
    } catch (_err) {
      throw new BadRequestException('خطایی رخ داد');
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
      _id: user._id,
      username: user.username,
      roles: user.roles,
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
      _id: user._id,
      username: user.username,
      roles: user.roles,
    };
  }

  // who am i
  async whoAmI(cookieUser: CookieUser, res: Response) {
    const user = await this.users.findOne(
      { _id: cookieUser },
      { username: true, roles: true },
    );
    if (!user) throw new ForbiddenException();

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
      _id: user._id,
      username: user.username,
      roles: user.roles,
    };
  }

  async getPost(postID: string) {
    if (!isValidObjectId(postID)) throw new NotFoundException();

    let post: Post & { _id: any; comments?: Array<Comment> } & {
      suggestedPosts?: Post[];
    } = await this.posts
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

    // get suggested posts
    const targetTags = post.tags.split(' ');
    let allTags: { _id: any; tags: string; score?: number }[] = await this.posts
      .find({}, { tags: true })
      .lean();

    allTags = allTags
      .map((doc) => {
        doc.score =
          doc.tags?.split(' ')?.filter((tag) => targetTags.includes(tag))
            ?.length || 0;

        return doc;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    post.suggestedPosts = await this.posts
      .find({
        _id: {
          $in: allTags.map((doc) => doc._id),
        },
      })
      .populate({
        path: 'user',
        select: {
          username: true,
          roles: true,
        },
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
    // console.log(
    //   await this.users.updateMany(
    //     { username: 'testtest' },
    //     { roles: [Role.user, Role.writer, Role.admin, Role.founder] },
    //   ),
    // );

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

  // cdn
  async cdn(fileID: string, res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'files', fileID));
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

  // get list of users
  getUsers() {
    return this.users.find(
      {},
      { username: true, roles: true, createdAt: true },
    );
  }

  // promote user (to writer)
  promoteUser(userID: string) {
    return this.users.updateOne(
      {
        _id: userID,
        roles: {
          $nin: Role.writer,
        },
      },
      {
        $push: {
          roles: Role.writer,
        },
      },
    );
  }

  // demote user (to writer)
  demoteUser(userID: string) {
    return this.users.updateOne(
      {
        _id: userID,
        roles: {
          $in: Role.writer,
          $nin: [Role.admin, Role.founder],
        },
      },
      {
        $pull: {
          roles: Role.writer,
        },
      },
    );
  }

  // delete user
  deleteUser(userID: string) {
    return this.users.deleteOne({ _id: userID });
  }
}
