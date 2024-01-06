"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = __importDefault(require("colors"));
var checkColor = colors_1.default.grey;
var dryRunColor = colors_1.default.bgYellow.black.bold;
var errorColor = colors_1.default.red.bold;
var failSymbolColor = colors_1.default.bgGreen.black.bold;
var infoColor = colors_1.default.yellow;
var successSymbolColor = colors_1.default.bgGreen.black.bold;
var logger = {
    action: function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        for (var i = 0; i < messages.length; i++) {
            var message = typeof messages[i] !== 'string' ? JSON.stringify(messages[i], undefined, 2) : messages[i];
            if (i === 0) {
                logger.write(infoColor('▶ '));
            }
            logger.write(infoColor(message));
            if (i === messages.length - 1) {
                logger.write(infoColor(' '));
            }
            else {
                logger.emptyLine();
            }
        }
    },
    info: function (message) {
        logger.write(checkColor("\u2022 ".concat(message, " ")));
    },
    emptyLine: function (nb) {
        if (nb === void 0) { nb = 1; }
        for (var i = 0; i < nb; i++) {
            logger.writeLn();
        }
    },
    error: function (message) {
        logger.writeLn(errorColor(message));
    },
    exception: function (error) {
        logger.writeLn(errorColor("\uD83D\uDED1 Error : ".concat(error.message, " ")));
    },
    dryRun: function (message) {
        logger.writeLn(dryRunColor(" [DRY RUN] ".concat(message, " ")));
    },
    fail: function (message) {
        if (message === void 0) { message = ''; }
        logger.writeLn(failSymbolColor(" ".concat(message ? message + ' ' : '', "\u2717 ")));
    },
    success: function (message) {
        if (message === void 0) { message = ''; }
        logger.writeLn(successSymbolColor(" ".concat(message ? message + ' ' : '', "\u2713 ")));
    },
    logo: function (name) {
        logger.writeLn(colors_1.default.bgWhite.black.bold(' '.repeat(name.length + 2)));
        logger.writeLn(colors_1.default.bgWhite.black.bold(' ' + name + ' '));
        logger.writeLn(colors_1.default.bgWhite.black.bold(' '.repeat(name.length + 2)));
        logger.emptyLine();
    },
    write: function (message) {
        if (message === void 0) { message = ''; }
        process.stdout.write(message);
    },
    writeLn: function (message) {
        if (message === void 0) { message = ''; }
        logger.write(message + '\n');
    },
};
exports.default = logger;
