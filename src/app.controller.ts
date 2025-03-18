import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDTO, LoginDTO, SignUpDTO } from './app.DTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // create post
  @UseInterceptors(FileInterceptor('picture'))
  @Post('create-post')
  createPost(
    @Body() createPostDTO: CreatePostDTO,
    @UploadedFile() picture: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.appService.createPost(createPostDTO, picture, req);
  }

  // signup
  @Post('signup')
  signup(
    @Body() signupDTO: SignUpDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appService.signUp(signupDTO, res);
  }

  // login
  @Post('login')
  login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) res: Response) {
    return this.appService.login(loginDTO, res);
  }

  // get post
  @Get('get-post/:id')
  getPost(@Param('id') postID: string) {
    return this.appService.getPost(postID);
  }

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }
}
