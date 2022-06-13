"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const jwt_1 = require("../helpers/jwt");
class CarsRoute {
    constructor(route) {
        route.get('/get/cars', jwt_1.verifyJWT, controller_1.default.getAll);
        route.post('/add/car', jwt_1.verifyJWT, controller_1.default.addCar);
        route.put('/edit/car', jwt_1.verifyJWT, controller_1.default.editCar);
        route.delete('/delete/car', jwt_1.verifyJWT, controller_1.default.deleteCar);
    }
}
exports.default = CarsRoute;
