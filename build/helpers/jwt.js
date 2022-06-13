"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET || "@123#456";
function verifyJWT(req, res, next) {
    const headers = req.headers;
    if (!headers.authorization)
        return res.status(400).json({ auth: false, message: 'Headers Empty' });
    const token = headers.authorization.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ auth: false, message: 'Not allowed.' });
    jsonwebtoken_1.default.verify(token, secret, function (err) {
        if (err)
            return res.status(400).json({ auth: false, message: 'Failed to authenticate token.' });
        next();
    });
}
exports.verifyJWT = verifyJWT;
