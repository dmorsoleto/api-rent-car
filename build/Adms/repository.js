"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adms_1 = require("../helpers/adms");
const model_1 = __importDefault(require("./model"));
const rawData = require('../../data/adms.json');
class AdmsRepository {
    async findOne(objFilter) {
        const obj = await model_1.default.findOne(objFilter).lean();
        return obj;
    }
    async createAdminsFromObj(objCreate) {
        await model_1.default.create(objCreate);
        return true;
    }
    async createAdmsDummyData() {
        const hasAdmins = await model_1.default.find({});
        if (hasAdmins.length > 0) {
            return;
        }
        for (let index = 0; index < rawData.length; index++) {
            const element = rawData[index];
            const passwordEncrypted = await (0, adms_1.convertPasswordToBcrypt)(element.password);
            await model_1.default.create(Object.assign(Object.assign({}, element), { password: passwordEncrypted }));
        }
    }
}
exports.default = new AdmsRepository;
