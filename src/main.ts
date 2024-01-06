#! /bin/env node
import { Argument, Option, program } from 'commander';

import { version } from '../package.json';
import { runRecipe } from './commands/runRecipe';
import logger from './utils/logger';
import { tryCatch } from './utils/tryCatch';

logger.logo('CookerJS v' + version);

program
  .version(version)
  .command('apply')
  .description('Run a recipe')
  .addArgument(new Argument('[recipe]', 'Recipe name'))
  .addOption(new Option('-p, --recipe-path <path>', 'Local path for recipe'))
  .addOption(new Option('-d, --dry-run', 'Simulate the command without actual execution'))
  .action(tryCatch(runRecipe));

program.parse(process.argv);
