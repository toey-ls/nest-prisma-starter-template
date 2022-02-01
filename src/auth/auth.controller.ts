import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() user: RegisterDTO) {
    return await this.authService.register(user);
  }

  @Post('/login')
  async login(@Body() user: LoginDTO) {
    return await this.authService.login(user.email, user.password);
  }
}
