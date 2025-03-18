import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type Roles = Array<Role>;

export enum Role {
  user,
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, minlength: 8, maxlength: 64 })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ type: SchemaTypes.Array, default: [] })
  roles: Roles;
}

export const UserDocument = SchemaFactory.createForClass(User);
