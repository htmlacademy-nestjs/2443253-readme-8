import { User } from './user.type';

export interface AuthUser extends User {
  passwordHash: string;
}
