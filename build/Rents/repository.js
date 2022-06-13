"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
class RentsRepository {
    async findOne(_id) {
        const hasCar = await model_1.default.findOne({ _id }).lean();
        return hasCar;
    }
}
exports.default = new RentsRepository;
