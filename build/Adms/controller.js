"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const adms_1 = require("../helpers/adms");
class AdmsController {
    async getAll(req, res) {
        try {
            const adms = await model_1.default.find({});
            return res.json({
                success: 1,
                adms
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async addAdmin(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            const passwordEncrypted = await (0, adms_1.convertPasswordToBcrypt)(password);
            const userSaved = await model_1.default.create({
                username,
                password: passwordEncrypted
            });
            return res.json({
                success: 1,
                admin: userSaved._id
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async editAdmin(req, res) {
        const { _id, username, password } = req.body;
        if (!_id || !username)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            const objToUpdate = {
                username
            };
            if (password) {
                const passwordEncrypted = await (0, adms_1.convertPasswordToBcrypt)(password);
                objToUpdate.password = passwordEncrypted;
            }
            await model_1.default.updateOne({ _id }, objToUpdate);
            return res.json({
                success: 1,
                admin: _id
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async deleteAdmin(req, res) {
        const { _id } = req.body;
        if (!_id)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            await model_1.default.deleteOne({ _id });
            return res.json({
                success: 1,
                admin: _id
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
exports.default = new AdmsController();
