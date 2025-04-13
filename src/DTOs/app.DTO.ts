import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  tags: string;
}

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}

export class CommentDTO {
  @IsString()
  @IsNotEmpty()
  postID: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class PromoteUserDTO {
  @IsString()
  @IsNotEmpty()
  userID: string;
}

export class DemoteUserDTO {
  @IsString()
  @IsNotEmpty()
  userID: string;
}
