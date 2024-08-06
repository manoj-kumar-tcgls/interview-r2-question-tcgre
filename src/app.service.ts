import { EnableClassLogger } from '@app/logger/decorator/enable-logger-for-class/enable-logger-for-class.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
@EnableClassLogger()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getWorld(): string {
    return 'World';
  }
}
