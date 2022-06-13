"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 13;
class UsersController {
    async getAll(req, res) {
        try {
            const users = await model_1.default.find({});
            return res.json({
                success: 1,
                users
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async addUser(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            const passwordEncrypted = await bcrypt_1.default.hash(password, saltRounds);
            const userSaved = await model_1.default.create({
                name,
                email,
                password: passwordEncrypted
            });
            return res.json({
                success: 1,
                user: userSaved._id
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async editUser(req, res) {
        const { _id, name, email, password } = req.body;
        if (!_id || !name || !email)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            const objToUpdate = {
                name,
                email,
            };
            if (password) {
                const passwordEncrypted = await bcrypt_1.default.hash(password, saltRounds);
                objToUpdate.password = passwordEncrypted;
            }
            await model_1.default.updateOne({ _id }, objToUpdate);
            return res.json({
                success: 1,
                user: _id
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async deleteUser(req, res) {
        const { _id } = req.body;
        if (!_id)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            await model_1.default.deleteOne({ _id });
            return res.json({
                success: 1,
                user: _id
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
exports.default = new UsersController();
