"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var FileSystem_1 = require("./actions/FileSystem");
var PackageJson_1 = require("./actions/PackageJson");
var recipeSchema = zod_1.z.object({
    version: zod_1.z.number().int(),
    recipe: zod_1.z.array(zod_1.z
        .object(__assign(__assign({}, PackageJson_1.PackageJson.getSchema()), FileSystem_1.FileSystem.getSchema()))
        .partial()),
});
exports.default = recipeSchema;
