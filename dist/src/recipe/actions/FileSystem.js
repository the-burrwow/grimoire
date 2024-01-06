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
exports.FileSystem = void 0;
var promises_1 = require("node:fs/promises");
var node_path_1 = require("node:path");
var zod_1 = require("zod");
var logger_1 = __importDefault(require("../../utils/logger"));
var checkFiles_1 = require("../utils/checkFiles");
var ActionsContainer_1 = require("./ActionsContainer");
var FileSystem = /** @class */ (function (_super) {
    __extends(FileSystem, _super);
    function FileSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileSystem.prototype.register = function () {
        return {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            copyFiles: this.copyFiles,
        };
    };
    FileSystem.getSchema = function () {
        return {
            copyFiles: zod_1.z.array(zod_1.z.object({
                from: zod_1.z.string().or(zod_1.z.array(zod_1.z.string())),
                to: zod_1.z.string().or(zod_1.z.array(zod_1.z.string())),
            })),
        };
    };
    FileSystem.prototype.copyFiles = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, item, fromArray, toArray, _b, fromArray_1, from, _c, toArray_1, to;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _i = 0, _a = data !== null && data !== void 0 ? data : [];
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        item = _a[_i];
                        fromArray = Array.isArray(item.from) ? item.from : [item.from];
                        toArray = Array.isArray(item.to) ? item.to : [item.to];
                        _b = 0, fromArray_1 = fromArray;
                        _d.label = 2;
                    case 2:
                        if (!(_b < fromArray_1.length)) return [3 /*break*/, 7];
                        from = fromArray_1[_b];
                        _c = 0, toArray_1 = toArray;
                        _d.label = 3;
                    case 3:
                        if (!(_c < toArray_1.length)) return [3 /*break*/, 6];
                        to = toArray_1[_c];
                        return [4 /*yield*/, this.copyFile(from, to)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _c++;
                        return [3 /*break*/, 3];
                    case 6:
                        _b++;
                        return [3 /*break*/, 2];
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FileSystem.prototype.copyFile = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var fromPath, toPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fromPath = (0, node_path_1.join)(this.context.recipeDirectory, from);
                        toPath = (0, node_path_1.join)(this.context.workingDirectory, to);
                        return [4 /*yield*/, (0, checkFiles_1.canReadFile)(fromPath)];
                    case 1:
                        _a = !(_b.sent());
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, checkFiles_1.canCreateFile)(toPath)];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            return [2 /*return*/];
                        }
                        logger_1.default.action("Copy from ".concat(from, " to ").concat(to));
                        if (!this.context.dryRun) return [3 /*break*/, 4];
                        logger_1.default.dryRun("No copy done");
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, (0, promises_1.copyFile)(fromPath, toPath)];
                    case 5:
                        _b.sent();
                        logger_1.default.success("Copy done");
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return FileSystem;
}(ActionsContainer_1.ActionsContainer));
exports.FileSystem = FileSystem;
