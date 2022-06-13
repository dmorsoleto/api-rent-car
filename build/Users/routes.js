"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const jwt_1 = require("../helpers/jwt");
class UsersRoute {
    constructor(route) {
        route.get('/get/users', jwt_1.verifyJWT, controller_1.default.getAll);
        route.post('/add/user', jwt_1.verifyJWT, controller_1.default.addUser);
        route.put('/edit/user', jwt_1.verifyJWT, controller_1.default.editUser);
        route.delete('/delete/user', jwt_1.verifyJWT, controller_1.default.deleteUser);
    }
}
exports.default = UsersRoute;
