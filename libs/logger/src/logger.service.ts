import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly context: String;
  constructor(context: String) {
    this.context = context;
  }

  info(msg: String) {
    console.log({
      ctx: this.context,
      msg: msg,
    });
  }

  error(msg: String, err: Error) {
    console.log({
      ctx: this.context,
      msg: msg,
      err: err,
    });
  }

  debug(msg: String, data: any[]) {
    console.log({
      ctx: this.context,
      msg: msg,
      data: data,
    });
  }
}

export class LogsProvider {
  static getLoggerInstance(ctx: any) {
    return new LoggerService(ctx);
  }
}
