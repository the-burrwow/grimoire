import { type Command } from 'commander';
import { readFileSync } from 'fs';
import { existsSync } from 'node:fs';
import { realpath } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';
import { fromZodError } from 'zod-validation-error';

import { RecipeRunner } from '../recipe/RecipeRunner';
import { downloadRecipe } from '../recipe/downloadRecipe';
import recipeSchema from '../recipe/recipe.schema';
import { type Options } from '../types';
import logger from '../utils/logger';

export async function runRecipe(recipe: string, options: Options, command: Command): Promise<void> {
  const dryRun = options.dryRun;
  const recipePath = options.recipePath;

  if (recipePath) {
    await runRecipeByPath(dryRun, recipePath);
  } else if (recipe) {
    await runRecipeByName(dryRun, recipe);
  } else {
    logger.error('Error: either <recipe> or -p/--recipe-path option is required');
    command.help();
  }
}

async function runRecipeByName(dryRun: boolean, recipeName: string): Promise<void> {
  const recipePath = await downloadRecipe(recipeName);

  await runRecipeByPath(dryRun, recipePath);
}

async function runRecipeByPath(dryRun: boolean, recipePath: string): Promise<void> {
  recipePath = await realpath(recipePath);
  const recipeFile = join(recipePath, 'recipe.yml');

  if (!existsSync(recipeFile)) {
    throw new Error('Recipe not found !');
  }

  const data = parse(readFileSync(recipeFile, 'utf8'));

  const result = recipeSchema.safeParse(data);
  if (!result.success) {
    const validationError = fromZodError(result.error);

    throw new Error(validationError.toString());
  }

  const recipeData = result.data;

  const runner = new RecipeRunner({
    workingDirectory: process.cwd(),
    recipeDirectory: recipePath,
    dryRun,
  });
  await runner.run(recipeData.recipe);
}
