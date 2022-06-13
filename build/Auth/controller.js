"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("../Adms/repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET || "@123#456";
class AuthController {
    async auth(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: 1, message: 'Required parameters not found!' });
        try {
            const hasAdm = await repository_1.default.findOne({ username });
            if (!hasAdm)
                return res.status(400).json({ error: 1, message: 'User not found!' });
            const finalPassSavedToCompare = hasAdm.password.replace(/^\$2y(.+)$/i, '$2a$1');
            const check = await bcrypt_1.default.compare(password, finalPassSavedToCompare);
            if (!check)
                return res.status(400).json({ error: 1, message: 'User or password not match!' });
            const id = hasAdm._id;
            const token = jsonwebtoken_1.default.sign({ id }, secret);
            return res.json({
                success: 1,
                token
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async authTestCI(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            if (username !== "testeci" && password !== "123456")
                return res.status(400).json({ error: 1, message: 'User or password not match!' });
            const token = jsonwebtoken_1.default.sign({ username }, secret);
            return res.json({
                success: 1,
                token
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
exports.default = new AuthController();
