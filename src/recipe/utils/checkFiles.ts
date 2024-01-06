import { constants } from 'node:fs';
import { access } from 'node:fs/promises';
import { dirname } from 'node:path';

import logger from '../../utils/logger';

export async function canReadFile(path: string): Promise<boolean> {
  try {
    logger.info(`Check if "${path}" exists ans is readable`);
    await access(path, constants.R_OK);
    logger.success();

    return true;
  } catch (e) {
    logger.fail();
    logger.error(`Unable to read "${path}" file. Error: ${e as any}`);

    return false;
  }
}

export async function canCreateFile(path: string): Promise<boolean> {
  try {
    logger.info(`Check if "${path}" is creatable`);
    await canWriteInDirectory(dirname(path));
    logger.success();

    return true;
  } catch (error) {
    logger.fail();
    logger.error(`Unable to create file "${path}". Error: ${error as any}`);

    return false;
  }
}

export async function canWriteInDirectory(path: string): Promise<boolean> {
  try {
    await access(path, constants.W_OK);

    return true;
  } catch (error) {
    logger.error(`Unable to write in "${path}" directory. Error: ${error as any}`);

    return false;
  }
}
