"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("./controllers"));
const jwt_1 = require("../helpers/jwt");
class MessagesRoute {
    constructor(route) {
        route.get('/get/messages', jwt_1.verifyJWT, controllers_1.default.getAll);
    }
}
exports.default = MessagesRoute;
