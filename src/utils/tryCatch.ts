import logger from './logger';

export function tryCatch(callback: (...args: any[]) => any) {
  return async (...args: any[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await callback(...args);
    } catch (e) {
      logger.exception(e);
    }
  };
}
