"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
class MessagesController {
    async getAll(req, res) {
        try {
            const all = await model_1.default.find({});
            return res.json({
                success: 1,
                messages: all
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
}
exports.default = new MessagesController();
