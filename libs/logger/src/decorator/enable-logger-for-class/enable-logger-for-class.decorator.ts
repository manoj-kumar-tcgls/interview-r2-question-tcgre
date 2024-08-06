import { LogsProvider } from '@app/logger/logger.service';

type constructor = { new (...args: any[]): any };
export function EnableClassLogger(logs?: boolean) {
  return function <T extends constructor>(constructor: T) {
    const methodDecorator = enable_method_logger(logs, constructor.name);
    for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
      if (key !== 'constructor') {
        const descriptor = Object.getOwnPropertyDescriptor(
          constructor.prototype,
          key,
        );
        if (descriptor && typeof descriptor.value === 'function') {
          Object.defineProperty(
            constructor.prototype,
            key,
            methodDecorator(constructor.prototype, key, descriptor),
          );
        }
      }
    }
  };
}

export function enable_method_logger(logs?: boolean, className?: string) {
  return function (
    _target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const original_method = descriptor.value;
    descriptor.value = function (...args: []) {
      const ctx = `${
        className ? className + '.' + propertyName : propertyName
      }`;
      const logger = LogsProvider.getLoggerInstance(ctx);
      var result: any;
      try {
        logger.info('starting');
        if (logs) {
          logger.debug('function was called with', args);
        }
        result = original_method.apply(this, args);

        if (result instanceof Promise) {
          result = result
            .then((res) => {
              logger.info(`Ending of method ${propertyName}`);
              if (logs) {
                logger.debug(`${propertyName} returned`, res);
              }
              return res;
            })
            .catch((error) => {
              logger.error(`Error in method ${propertyName}`, error);
              throw error;
            });
        } else {
          logger.info(`Ending of method ${propertyName}`);
          if (logs) {
            logger.debug(`${propertyName} returned`, result);
          }
        }
      } catch (error) {
        logger.error(`Error in method ${propertyName}`, error);
        throw error;
      }
      return result;
    };

    return descriptor;
  };
}
