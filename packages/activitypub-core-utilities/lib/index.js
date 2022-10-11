"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyWithContext = exports.streamToString = exports.parseStream = exports.getTypedEntity = exports.getId = exports.getGuid = exports.getCollectionNameByUrl = exports.generateKeyPair = exports.convertUrlsToStrings = exports.convertStringsToUrls = exports.convertFromJsonLd = exports.compressEntity = exports.combineAddresses = exports.cleanProps = exports.addContext = void 0;
var addContext_1 = require("./addContext");
Object.defineProperty(exports, "addContext", { enumerable: true, get: function () { return addContext_1.addContext; } });
var cleanProps_1 = require("./cleanProps");
Object.defineProperty(exports, "cleanProps", { enumerable: true, get: function () { return cleanProps_1.cleanProps; } });
var combineAddresses_1 = require("./combineAddresses");
Object.defineProperty(exports, "combineAddresses", { enumerable: true, get: function () { return combineAddresses_1.combineAddresses; } });
var compressEntity_1 = require("./compressEntity");
Object.defineProperty(exports, "compressEntity", { enumerable: true, get: function () { return compressEntity_1.compressEntity; } });
var convertFromJsonLd_1 = require("./convertFromJsonLd");
Object.defineProperty(exports, "convertFromJsonLd", { enumerable: true, get: function () { return convertFromJsonLd_1.convertFromJsonLd; } });
var convertStringsToUrls_1 = require("./convertStringsToUrls");
Object.defineProperty(exports, "convertStringsToUrls", { enumerable: true, get: function () { return convertStringsToUrls_1.convertStringsToUrls; } });
var convertUrlsToStrings_1 = require("./convertUrlsToStrings");
Object.defineProperty(exports, "convertUrlsToStrings", { enumerable: true, get: function () { return convertUrlsToStrings_1.convertUrlsToStrings; } });
var generateKeyPair_1 = require("./generateKeyPair");
Object.defineProperty(exports, "generateKeyPair", { enumerable: true, get: function () { return generateKeyPair_1.generateKeyPair; } });
var getCollectionNameByUrl_1 = require("./getCollectionNameByUrl");
Object.defineProperty(exports, "getCollectionNameByUrl", { enumerable: true, get: function () { return getCollectionNameByUrl_1.getCollectionNameByUrl; } });
var getGuid_1 = require("./getGuid");
Object.defineProperty(exports, "getGuid", { enumerable: true, get: function () { return getGuid_1.getGuid; } });
var getId_1 = require("./getId");
Object.defineProperty(exports, "getId", { enumerable: true, get: function () { return getId_1.getId; } });
var getTypedEntity_1 = require("./getTypedEntity");
Object.defineProperty(exports, "getTypedEntity", { enumerable: true, get: function () { return getTypedEntity_1.getTypedEntity; } });
var parseStream_1 = require("./parseStream");
Object.defineProperty(exports, "parseStream", { enumerable: true, get: function () { return parseStream_1.parseStream; } });
var streamToString_1 = require("./streamToString");
Object.defineProperty(exports, "streamToString", { enumerable: true, get: function () { return streamToString_1.streamToString; } });
var stringifyWithContext_1 = require("./stringifyWithContext");
Object.defineProperty(exports, "stringifyWithContext", { enumerable: true, get: function () { return stringifyWithContext_1.stringifyWithContext; } });
__exportStar(require("./globals"), exports);
//# sourceMappingURL=index.js.map