import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
