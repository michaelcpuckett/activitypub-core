"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyGetEndpoint = exports.UploadMediaPostEndpoint = exports.NodeinfoGetEndpoint = exports.HostMetaGetEndpoint = exports.WebfingerGetEndpoint = exports.SharedInboxPostEndpoint = exports.InboxPostEndpoint = exports.OutboxPostEndpoint = exports.EntityGetEndpoint = exports.HomeGetEndpoint = exports.UserPostEndpoint = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "UserPostEndpoint", { enumerable: true, get: function () { return user_1.UserPostEndpoint; } });
var home_1 = require("./home");
Object.defineProperty(exports, "HomeGetEndpoint", { enumerable: true, get: function () { return home_1.HomeGetEndpoint; } });
var entity_1 = require("./entity");
Object.defineProperty(exports, "EntityGetEndpoint", { enumerable: true, get: function () { return entity_1.EntityGetEndpoint; } });
var outbox_1 = require("./outbox");
Object.defineProperty(exports, "OutboxPostEndpoint", { enumerable: true, get: function () { return outbox_1.OutboxPostEndpoint; } });
var inbox_1 = require("./inbox");
Object.defineProperty(exports, "InboxPostEndpoint", { enumerable: true, get: function () { return inbox_1.InboxPostEndpoint; } });
var sharedInbox_1 = require("./sharedInbox");
Object.defineProperty(exports, "SharedInboxPostEndpoint", { enumerable: true, get: function () { return sharedInbox_1.SharedInboxPostEndpoint; } });
var webfinger_1 = require("./webfinger");
Object.defineProperty(exports, "WebfingerGetEndpoint", { enumerable: true, get: function () { return webfinger_1.WebfingerGetEndpoint; } });
var host_meta_1 = require("./host-meta");
Object.defineProperty(exports, "HostMetaGetEndpoint", { enumerable: true, get: function () { return host_meta_1.HostMetaGetEndpoint; } });
var nodeinfo_1 = require("./nodeinfo");
Object.defineProperty(exports, "NodeinfoGetEndpoint", { enumerable: true, get: function () { return nodeinfo_1.NodeinfoGetEndpoint; } });
var uploadMedia_1 = require("./uploadMedia");
Object.defineProperty(exports, "UploadMediaPostEndpoint", { enumerable: true, get: function () { return uploadMedia_1.UploadMediaPostEndpoint; } });
var proxy_1 = require("./proxy");
Object.defineProperty(exports, "ProxyGetEndpoint", { enumerable: true, get: function () { return proxy_1.ProxyGetEndpoint; } });
//# sourceMappingURL=index.js.map