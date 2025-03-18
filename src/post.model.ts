import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from './user.model';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: SchemaTypes.String, required: true })
  picture: string;

  @Prop({ type: SchemaTypes.String, required: true })
  title: string;

  @Prop({ type: SchemaTypes.String, required: true })
  description: string;

  @Prop({ type: SchemaTypes.String, required: true })
  tags: string;

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  user: User;
}

export const PostDocument = SchemaFactory.createForClass(Post);
