"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveActivity = void 0;
async function saveActivity() {
    const recipientInboxIds = await this.getRecipientInboxIds();
    for (const recipientInboxId of recipientInboxIds) {
        if (!recipientInboxId) {
            continue;
        }
        await this.adapters.db.insertOrderedItem(recipientInboxId, this.activity.id);
    }
    await this.adapters.db.saveEntity(this.activity);
}
exports.saveActivity = saveActivity;
//# sourceMappingURL=saveActivity.js.map