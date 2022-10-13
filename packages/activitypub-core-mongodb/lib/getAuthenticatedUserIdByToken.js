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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUserIdByToken = void 0;
const firebaseAdmin = __importStar(require("firebase-admin"));
async function getAuthenticatedUserIdByToken(token, serviceAccount) {
    if (!firebaseAdmin.apps.length) {
        const appOptions = {
            credential: firebaseAdmin.credential.cert(serviceAccount),
            projectId: 'socialweb-id',
        };
        firebaseAdmin.initializeApp(appOptions);
    }
    const user = !token
        ? null
        : await firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then(async (userCredential) => {
            return userCredential ?? null;
        })
            .catch((error) => {
            console.error(String(error));
            return null;
        });
    if (!user?.uid) {
        return null;
    }
    return user.uid;
}
exports.getAuthenticatedUserIdByToken = getAuthenticatedUserIdByToken;
//# sourceMappingURL=getAuthenticatedUserIdByToken.js.map