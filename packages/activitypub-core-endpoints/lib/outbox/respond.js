"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respond = void 0;
const activitypub_core_types_1 = require("activitypub-core-types");
const activitypub_core_utilities_1 = require("activitypub-core-utilities");
async function respond() {
    await this.parseBody();
    (0, activitypub_core_types_1.assertExists)(this.activity);
    await this.getActor();
    await this.authenticateActor();
    (0, activitypub_core_types_1.assertIsApActor)(this.actor);
    const activityId = new URL(`${activitypub_core_utilities_1.LOCAL_DOMAIN}/entity/${(0, activitypub_core_utilities_1.getGuid)()}`);
    this.activity.id = activityId;
    if ((0, activitypub_core_utilities_1.isTypeOf)(this.activity, activitypub_core_types_1.AP.ActivityTypes)) {
        (0, activitypub_core_types_1.assertIsApActivity)(this.activity);
        this.activity.url = activityId;
        await this.runSideEffects();
    }
    else {
        await this.wrapInActivity();
    }
    (0, activitypub_core_types_1.assertIsApActivity)(this.activity);
    this.activity = (0, activitypub_core_utilities_1.combineAddresses)(this.activity);
    (0, activitypub_core_types_1.assertExists)(this.activity.id);
    await this.saveActivity();
    (0, activitypub_core_types_1.assertIsApActor)(this.actor);
    await this.adapters.delivery.broadcast(this.activity, this.actor);
    this.res.statusCode = 201;
    this.res.setHeader('Location', this.activity.id.toString());
    this.res.end();
}
exports.respond = respond;
//# sourceMappingURL=respond.js.map