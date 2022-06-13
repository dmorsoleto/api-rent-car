"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("./controllers"));
const jwt_1 = require("../helpers/jwt");
class RentsRoute {
    constructor(route) {
        route.get('/get/rents', jwt_1.verifyJWT, controllers_1.default.getAll);
        route.post('/add/rent', jwt_1.verifyJWT, controllers_1.default.addRent);
        route.put('/cancel/rent', jwt_1.verifyJWT, controllers_1.default.cancelRent);
        route.get('/calcular-dias-restantes', jwt_1.verifyJWT, controllers_1.default.calculateRemainingDays);
    }
}
exports.default = RentsRoute;
