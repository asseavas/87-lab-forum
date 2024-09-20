import { Model, Types } from 'mongoose';

export interface PostMutation {
  title: string;
  description: string | null;
  image: string | null;
  user: Types.ObjectId | undefined;
  datetime: Date;
}

export interface CommentMutation {
  user: Types.ObjectId | undefined;
  post: Types.ObjectId;
  text: string;
  datetime: Date;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface PostFields {
  title: string;
  description: string | null;
  image: string | null;
  user: Types.ObjectId;
  datetime: Date;
}

export interface CommentFields {
  user: Types.ObjectId;
  post: Types.ObjectId;
  text: string;
  datetime: Date;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
