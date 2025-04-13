import { Role } from "./role.type";

export type User = {
  _id: string;
  username: string;
  roles: Role[];
  createdAt: string;
};
