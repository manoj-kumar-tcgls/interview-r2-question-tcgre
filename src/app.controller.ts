import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EnableClassLogger } from '@app/logger/decorator/enable-logger-for-class/enable-logger-for-class.decorator';

@Controller()
@EnableClassLogger()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getWorld(): string {
    return this.appService.getWorld();
  }
}
