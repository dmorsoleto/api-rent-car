"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const jwt_1 = require("../helpers/jwt");
class AdmsRoute {
    constructor(route) {
        route.get('/get/admins', jwt_1.verifyJWT, controller_1.default.getAll);
        route.post('/add/admin', jwt_1.verifyJWT, controller_1.default.addAdmin);
        route.put('/edit/admin', jwt_1.verifyJWT, controller_1.default.editAdmin);
        route.delete('/delete/admin', jwt_1.verifyJWT, controller_1.default.deleteAdmin);
    }
}
exports.default = AdmsRoute;
