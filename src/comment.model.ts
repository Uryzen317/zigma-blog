import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Post } from './post.model';
import { User } from './user.model';

export enum CommentStatus {
  pending,
  confirmed,
  rejected,
}

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ ref: 'Post', type: SchemaTypes.ObjectId })
  post: Post;

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  user: User;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  dislikes: number;

  @Prop({ default: CommentStatus.pending })
  status: CommentStatus;
}

export const CommentDocument = SchemaFactory.createForClass(Comment);
