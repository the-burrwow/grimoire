import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z, type ZodType } from 'zod';

import { type Actions } from '../../types';
import logger from '../../utils/logger';
import { canReadFile } from '../utils/checkFiles';
import { ActionsContainer } from './ActionsContainer';

type Dependencies = Record<string, string>;

export class PackageJson extends ActionsContainer {
  register(): Actions {
    return {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      addDevDependencies: this.addDevDependencies,
    };
  }

  static getSchema(): Record<string, ZodType> {
    return {
      addDevDependencies: z.record(z.string()),
    };
  }

  async addDevDependencies(dependencies: Dependencies): Promise<void> {
    const packageJsonPath = join(this.context.workingDirectory, 'package.json');

    if (!(await canReadFile(packageJsonPath))) {
      return;
    }

    logger.action('Add to dev-dependencies:', dependencies);

    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...dependencies,
    };

    if (this.context.dryRun) {
      logger.dryRun('No package.json update done');
    } else {
      await writeFile(this.context.workingDirectory + '/package.json', JSON.stringify(packageJson, null, 2));
      logger.success('Package.json updated');
    }
  }
}
