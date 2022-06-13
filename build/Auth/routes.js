"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
class AuthRoute {
    constructor(route) {
        route.post('/auth', controller_1.default.auth);
        route.post('/auth/test/ci', controller_1.default.authTestCI);
    }
}
exports.default = AuthRoute;
