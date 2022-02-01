import { Role } from '.prisma/client';

export interface AuthPayload {
  token: string;
  user_info: {
    id: number;
    email: string;
    role: Role;
  };
}

export interface JwtPayload {
  id: number;
  email: string;
  role: Role;
}

export interface CurrentUser extends JwtPayload {
  createAt: Date;
  updateAt: Date;
}
