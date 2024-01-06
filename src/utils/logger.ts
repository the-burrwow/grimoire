import colors from 'colors';

const checkColor = colors.grey;
const dryRunColor = colors.bgYellow.black.bold;
const errorColor = colors.red.bold;
const failSymbolColor = colors.bgGreen.black.bold;
const infoColor = colors.yellow;
const successSymbolColor = colors.bgGreen.black.bold;

const logger = {
  action: (...messages: unknown[]): void => {
    for (let i = 0; i < messages.length; i++) {
      const message: string =
        typeof messages[i] !== 'string' ? JSON.stringify(messages[i], undefined, 2) : (messages[i] as string);

      if (i === 0) {
        logger.write(infoColor('▶ '));
      }

      logger.write(infoColor(message));

      if (i === messages.length - 1) {
        logger.write(infoColor(' '));
      } else {
        logger.emptyLine();
      }
    }
  },

  info: (message: string): void => {
    logger.write(checkColor(`• ${message} `));
  },

  emptyLine: (nb = 1): void => {
    for (let i = 0; i < nb; i++) {
      logger.writeLn();
    }
  },

  error: (message: string): void => {
    logger.writeLn(errorColor(message));
  },

  exception: (error: any): void => {
    logger.writeLn(errorColor(`🛑 Error : ${(error as Error).message} `));
  },

  dryRun: (message: string) => {
    logger.writeLn(dryRunColor(` [DRY RUN] ${message} `));
  },

  fail: (message: string = '') => {
    logger.writeLn(failSymbolColor(` ${message ? message + ' ' : ''}✗ `));
  },

  success: (message: string = '') => {
    logger.writeLn(successSymbolColor(` ${message ? message + ' ' : ''}✓ `));
  },

  logo: (name: string): void => {
    logger.writeLn(colors.bgWhite.black.bold(' '.repeat(name.length + 2)));
    logger.writeLn(colors.bgWhite.black.bold(' ' + name + ' '));
    logger.writeLn(colors.bgWhite.black.bold(' '.repeat(name.length + 2)));
    logger.emptyLine();
  },

  write: (message: string = ''): void => {
    process.stdout.write(message);
  },

  writeLn: (message: string = ''): void => {
    logger.write(message + '\n');
  },
};

export default logger;
