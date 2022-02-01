import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, JwtPayload } from './dto/interface/payload.interface';
import { User } from '.prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterDTO) {
    const userDB = await this.userService.findByEmail(user.email);
    if (userDB) {
      throw new BadRequestException('email is already');
    }
    const hashPassword = await bcrypt.hash(user.password, 10);

    await this.userService.saveUser(user.email, hashPassword);

    return {
      message: 'register success',
    };
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.validate(email, password);
    if (!user) {
      throw new UnauthorizedException('username or password is valid');
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload).toString();

    return {
      token,
      user_info: { email: user.email, id: user.id, role: user.role },
    };
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return null;
    }

    return user;
  }
}
