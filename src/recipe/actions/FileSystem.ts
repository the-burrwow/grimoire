import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z, type ZodType } from 'zod';

import { type Actions, type RecipeType } from '../../types';
import logger from '../../utils/logger';
import { canCreateFile, canReadFile } from '../utils/checkFiles';
import { ActionsContainer } from './ActionsContainer';

export class FileSystem extends ActionsContainer {
  register(): Actions {
    return {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      copyFiles: this.copyFiles,
    };
  }

  static getSchema(): Record<string, ZodType> {
    return {
      copyFiles: z.array(
        z.object({
          from: z.string().or(z.array(z.string())),
          to: z.string().or(z.array(z.string())),
        })
      ),
    };
  }

  async copyFiles(data: RecipeType['recipe'][0]['copyFiles']): Promise<void> {
    for (const item of data ?? []) {
      const fromArray = Array.isArray(item.from) ? item.from : [item.from];
      const toArray = Array.isArray(item.to) ? item.to : [item.to];

      for (const from of fromArray) {
        for (const to of toArray) {
          await this.copyFile(from, to);
        }
      }
    }
  }

  private async copyFile(from: string, to: string): Promise<void> {
    const fromPath = join(this.context.recipeDirectory, from);
    const toPath = join(this.context.workingDirectory, to);

    if (!(await canReadFile(fromPath)) || !(await canCreateFile(toPath))) {
      return;
    }

    logger.action(`Copy from ${from} to ${to}`);

    if (this.context.dryRun) {
      logger.dryRun(`No copy done`);
    } else {
      await copyFile(fromPath, toPath);
      logger.success(`Copy done`);
    }
  }
}
