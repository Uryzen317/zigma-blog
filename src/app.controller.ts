import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CommentDTO, CreatePostDTO, LoginDTO, SignUpDTO } from './DTOs/app.DTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { cookieUser } from './decorators/cookie-user.decorator';
import { CookieUser } from './interfaces/CookieUser.type';
import { UserGuard } from './guards/user.guard';
import RoleSybmol from './symbols/role.symbol';
import { Role } from './models/user.model';
import { AuthLimitInterceptor } from './interceptors/auth-limit.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // create post
  @Post('create-post')
  @UseGuards(UserGuard)
  @SetMetadata(RoleSybmol, Role.writer)
  @UseInterceptors(FileInterceptor('picture'))
  createPost(
    @Body() createPostDTO: CreatePostDTO,
    @UploadedFile() picture: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.appService.createPost(createPostDTO, picture, req);
  }

  // signup
  @Post('signup')
  @UseInterceptors(AuthLimitInterceptor)
  signup(
    @Body() signupDTO: SignUpDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appService.signUp(signupDTO, res);
  }

  // login
  @Post('login')
  @UseInterceptors(AuthLimitInterceptor)
  login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) res: Response) {
    return this.appService.login(loginDTO, res);
  }

  // get post
  @Get('get-post/:id')
  getPost(@Param('id') postID: string) {
    return this.appService.getPost(postID);
  }

  // comment
  @Post('comment')
  @UseGuards(UserGuard)
  @SetMetadata(RoleSybmol, Role.user)
  comment(
    @cookieUser() cookieUser: CookieUser,
    @Body() commentDTO: CommentDTO,
  ) {
    return this.appService.comment(cookieUser, commentDTO);
  }

  // get home
  @Get('get-home')
  getHome() {
    return this.appService.getHome();
  }

  // search
  @Get('search')
  search(@Query() queries) {
    return this.appService.search(queries['query'] || '');
  }

  // cdn
  @Get('cdn/:id')
  cdn(@Param('id') id: string, @Res() res: Response) {
    return this.appService.cdn(id, res);
  }

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }
}
