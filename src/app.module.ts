import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostDocument } from './models/post.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { User, UserDocument } from './models/user.model';
import { ConfigModule } from '@nestjs/config';
import { Comment, CommentDocument } from './models/comment.model';
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthLimitInterceptor } from './interceptors/auth-limit.interceptor';

// requirements
require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${DB_USERNAME && DB_PASSWORD ? DB_USERNAME + ':' + DB_PASSWORD + '@' : ''}${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    ),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostDocument },
      { name: User.name, schema: UserDocument },
      { name: Comment.name, schema: CommentDocument },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: '../files',
        filename(req, file, callback) {
          // TO DO : proper validation of file type
          const extention = extname(file.originalname);
          const newName = v4();

          callback(null, newName + extention);
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ScheduleModule.forRoot(),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthLimitInterceptor],
})
export class AppModule {}
