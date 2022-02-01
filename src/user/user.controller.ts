import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from 'src/auth/dto/payload.interface';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  me(@Req() req: Request) {
    return '';
  }
}
