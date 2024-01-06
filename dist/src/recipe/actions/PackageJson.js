"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
var promises_1 = require("node:fs/promises");
var node_path_1 = require("node:path");
var zod_1 = require("zod");
var logger_1 = __importDefault(require("../../utils/logger"));
var checkFiles_1 = require("../utils/checkFiles");
var ActionsContainer_1 = require("./ActionsContainer");
var PackageJson = /** @class */ (function (_super) {
    __extends(PackageJson, _super);
    function PackageJson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PackageJson.prototype.register = function () {
        return {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            addDevDependencies: this.addDevDependencies,
        };
    };
    PackageJson.getSchema = function () {
        return {
            addDevDependencies: zod_1.z.record(zod_1.z.string()),
        };
    };
    PackageJson.prototype.addDevDependencies = function (dependencies) {
        return __awaiter(this, void 0, void 0, function () {
            var packageJsonPath, packageJson, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        packageJsonPath = (0, node_path_1.join)(this.context.workingDirectory, 'package.json');
                        return [4 /*yield*/, (0, checkFiles_1.canReadFile)(packageJsonPath)];
                    case 1:
                        if (!(_c.sent())) {
                            return [2 /*return*/];
                        }
                        logger_1.default.action('Add to dev-dependencies:', dependencies);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, (0, promises_1.readFile)(packageJsonPath, 'utf-8')];
                    case 2:
                        packageJson = _b.apply(_a, [_c.sent()]);
                        packageJson.devDependencies = __assign(__assign({}, packageJson.devDependencies), dependencies);
                        if (!this.context.dryRun) return [3 /*break*/, 3];
                        logger_1.default.dryRun('No package.json update done');
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, (0, promises_1.writeFile)(this.context.workingDirectory + '/package.json', JSON.stringify(packageJson, null, 2))];
                    case 4:
                        _c.sent();
                        logger_1.default.success('Package.json updated');
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PackageJson;
}(ActionsContainer_1.ActionsContainer));
exports.PackageJson = PackageJson;
