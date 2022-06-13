"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPasswordToBcrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 13;
async function convertPasswordToBcrypt(pass) {
    const passwordEncrypted = await bcrypt_1.default.hash(pass, saltRounds);
    return passwordEncrypted;
}
exports.convertPasswordToBcrypt = convertPasswordToBcrypt;
