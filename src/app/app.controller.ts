import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(): { meg: string } {
    return { meg: 'server status ok' };
  }
}
