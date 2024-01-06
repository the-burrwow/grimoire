import { createWriteStream, existsSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { type ReadableStream } from 'node:stream/web';
import tar from 'tar';

import logger from '../utils/logger';

export async function downloadRecipe(recipe: string): Promise<string> {
  logger.info(`Search ${recipe} recipe`);
  // Search recipe
  const endpoint = `https://registry.npmjs.org/cookerjs-${recipe}-recipe`;
  const searchResponse = await fetch(endpoint);
  // @TODO Add type for data
  const data = await searchResponse.json();

  if (data.error) {
    logger.fail();
    throw new Error('Recipe not found');
  } else {
    logger.success();
  }

  const version = data['dist-tags'].latest as string;
  const url = data.versions[version].dist.tarball as string;

  // Download tgz file
  logger.info(`Download ${url}`);
  const downloadResponse = await fetch(url);

  if (!downloadResponse.ok || downloadResponse.body === null) {
    logger.fail();
    throw new Error(`Error while downloading : ${downloadResponse.statusText}`);
  } else {
    logger.success();
  }

  // Create recipe root directory
  const tmpRecipeRoot = join(tmpdir(), recipe, version);
  if (existsSync(tmpRecipeRoot)) {
    await rm(tmpRecipeRoot, { recursive: true });
  }
  await mkdir(tmpRecipeRoot, { recursive: true });

  // Create a temp file to save tgz file
  const tmpFile = join(tmpRecipeRoot, 'dist.tgz');
  const fileStream = createWriteStream(tmpFile, { flags: 'wx' });

  // Write tgz file in temp file
  await finished(Readable.fromWeb(downloadResponse.body as ReadableStream<any>).pipe(fileStream));

  // Untar in destination folder
  const tmpDir = join(tmpRecipeRoot, 'dist');
  await mkdir(tmpDir);
  await tar.x({
    file: tmpFile,
    C: tmpDir,
  });

  logger.success('Download and untar done !');

  return join(tmpDir, 'package');
}
