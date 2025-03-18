import { ObjectId } from 'mongoose';
import { Roles } from 'src/user.model';

export type CookieUser = {
  _id: ObjectId;
  username: string;
  roles: Roles;
};
