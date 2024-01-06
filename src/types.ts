import { type z } from 'zod';

import type recipeSchema from './recipe/recipe.schema';

export type Actions = Record<string, (...args: any[]) => void | Promise<void>>;

export interface Context {
  workingDirectory: string;
  recipeDirectory: string;
  dryRun: boolean;
}

export interface Options {
  dryRun: boolean;
  recipePath: string;
}

export type Recipe = Array<Record<string, any>>;

export type RecipeType = z.infer<typeof recipeSchema>;
