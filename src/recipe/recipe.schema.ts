import { z } from 'zod';

import { FileSystem } from './actions/FileSystem';
import { PackageJson } from './actions/PackageJson';

const recipeSchema = z.object({
  version: z.number().int(),
  recipe: z.array(
    z
      .object({
        ...PackageJson.getSchema(),
        ...FileSystem.getSchema(),
      })
      .partial()
  ),
});

export default recipeSchema;
