#! /bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var package_json_1 = require("../package.json");
var runRecipe_1 = require("./commands/runRecipe");
var logger_1 = __importDefault(require("./utils/logger"));
var tryCatch_1 = require("./utils/tryCatch");
logger_1.default.logo('CookerJS v' + package_json_1.version);
commander_1.program
    .version(package_json_1.version)
    .command('apply')
    .description('Run a recipe')
    .addArgument(new commander_1.Argument('[recipe]', 'Recipe name'))
    .addOption(new commander_1.Option('-p, --recipe-path <path>', 'Local path for recipe'))
    .addOption(new commander_1.Option('-d, --dry-run', 'Simulate the command without actual execution'))
    .action((0, tryCatch_1.tryCatch)(runRecipe_1.runRecipe));
commander_1.program.parse(process.argv);
